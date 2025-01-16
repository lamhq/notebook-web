import { use, useEffect, useReducer, useRef } from 'react';
import { cache } from './cache';

export type RequestParamFn<Arg, ReqParams> = (arg: Arg) => ReqParams;

export type RequestFn<ReqParams, Response> = (
  params: ReqParams,
) => Promise<Response>;

export type TransformResponseFn<Response, Arg, Result> = (
  resp: Response,
  arg: Arg,
) => Result;

export type CreateQueryConfig<Arg, ReqParams, Response, Result> = {
  params: RequestParamFn<Arg, ReqParams>;
  request: RequestFn<ReqParams, Response>;
  transformResponse: TransformResponseFn<Response, Arg, Result>;
};

export type QueryHook<Arg, Result> = (arg: Arg) => Result;

export function createQuery<Arg, ReqParams, Response, Result>(
  options: CreateQueryConfig<Arg, ReqParams, Response, Result>,
): QueryHook<Arg, Result> {
  const cachedFn = cache(async (arg: Arg) => {
    const axiosConfig = options.params(arg);
    const response = await options.request(axiosConfig);
    return options.transformResponse(response, arg);
  }, 5000);
  return (arg: Arg) => use(cachedFn(arg));
}

export type MutationState<Result, Er> = {
  data?: Result;
  error?: Er;
  isLoading: boolean;
};

export type MutationHook<Arg, Result, Er> = () => [
  (arg: Arg) => Promise<void>,
  MutationState<Result, Er>,
];

type ReducerAction<Result, Er> =
  | {
      type: 'FETCH_INIT';
    }
  | {
      type: 'FETCH_SUCCESS';
      payload: Result;
    }
  | {
      type: 'FETCH_FAILURE';
      payload: Er;
    };

function reducer<Result, Er>(
  state: MutationState<Result, Er>,
  action: ReducerAction<Result, Er>,
): MutationState<Result, Er> {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, error: undefined };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error();
  }
}

export function createMutation<Arg, ReqParams, Response, Result, Er>(
  options: CreateQueryConfig<Arg, ReqParams, Response, Result>,
): MutationHook<Arg, Result, Er> {
  const hook: MutationHook<Arg, Result, Er> = () => {
    const [state, dispatch] = useReducer(reducer, {
      isLoading: true,
    } as MutationState<Result, Er>);
    const isMounted = useRef(false);
    const request = async (arg: Arg) => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const axiosConfig = options.params(arg);
        const response = await options.request(axiosConfig);
        const result = options.transformResponse(response, arg);
        if (isMounted.current) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        const err = error as Er;
        if (isMounted.current) {
          dispatch({ type: 'FETCH_FAILURE', payload: err });
        }
      }
    };

    // mechanism to skip state set if component is unmounted
    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);

    return [request, state];
  };
  return hook;
}
