import { use, useEffect, useReducer, useRef, useState } from 'react';
import cache from './cache';
import { createAxiosRequest } from './request';
import type { AsyncFn, Fn } from './types';

function reducer<T>(state: MutationState<T>, action: ReducerAction<T>) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true };
    case 'FETCH_COMPLETED':
      return { ...state, isLoading: false, data: action.payload };
    default:
      throw new Error('Invalid reducer action');
  }
}

type CreateApiOptions = {
  request: AsyncFn;
};

function createApi({ request }: CreateApiOptions) {
  /**
   * Query hook creator
   */
  const createQuery = <Arg, Result, ApiRequest, ApiResponse>(
    transformParams: Fn<Arg, ApiRequest>,
    transformResponse: Fn<ApiResponse, Result>,
  ): QueryHook<Arg, Result> => {
    const asyncRequestFn: AsyncFn<Arg, Result> = async (arg) => {
      const requestArg = transformParams(arg);
      const response = await (request as AsyncFn<ApiRequest, ApiResponse>)(
        requestArg,
      );
      return transformResponse(response);
    };
    const { cachedFn, clearCache } = cache(asyncRequestFn);
    const queryHook: QueryHook<Arg, Result> = (arg) => {
      const data = use(cachedFn(arg));
      const [, setFlag] = useState(false);
      const refetch = () => {
        clearCache();
        setFlag((prev) => !prev);
      };
      return [data, { refetch }];
    };
    return queryHook;
  };

  /**
   * Mutation hook creator
   */
  const createMutation = <Arg, Result, ApiRequest, ApiResponse>(
    transformParams: Fn<Arg, ApiRequest>,
    transformResponse: Fn<ApiResponse, Result>,
  ): MutationHook<Arg, Result> => {
    return () => {
      const initialState: MutationState<Result> = {
        isLoading: false,
      };
      const [state, dispatch] = useReducer(reducer, initialState);
      const isMounted = useRef(false);
      const requestFn: Fn<Arg, Promise<void>> = async (arg) => {
        dispatch({ type: 'FETCH_INIT' });

        try {
          const requestArg = transformParams(arg);
          // prettier-ignore
          const response = await (request as AsyncFn<ApiRequest, ApiResponse>)(requestArg);
          const result = transformResponse(response);
          if (isMounted.current) {
            dispatch({ type: 'FETCH_COMPLETED', payload: result });
          }
        } catch (err) {
          if (isMounted.current) {
            dispatch({ type: 'FETCH_COMPLETED' });
          }
          throw err;
        }
      };

      // skip state set if component is unmounted
      useEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);

      return [requestFn, state];
    };
  };

  return { createQuery, createMutation };
}

export const { createQuery, createMutation } = createApi({
  request: createAxiosRequest({ baseURL: '/api' }),
});

type QueryHook<Arg, Result> = Fn<Arg, [Result, { refetch: () => void }]>;

type MutationHook<Arg, Result> = () => [
  Fn<Arg, Promise<void>>,
  MutationState<Result>,
];

type MutationState<Result> = {
  data?: Result;
  isLoading: boolean;
};

type ReducerAction<Result> =
  | {
      type: 'FETCH_INIT';
    }
  | {
      type: 'FETCH_COMPLETED';
      payload?: Result;
    };
