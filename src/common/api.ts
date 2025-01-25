import { use, useEffect, useReducer, useRef } from 'react';

import type { CacheApi } from './cache';
import { createMemCache } from './cache';
import { createAxiosRequest } from './request';
import type { AsyncFn, Fn } from './types';

type MutationState<Result> = {
  data?: Result;
  isLoading: boolean;
};

type MutationHook<Arg, Result> = () => [
  (arg: Arg) => Promise<void>,
  MutationState<Result>,
];

type ReducerAction<Result> =
  | {
      type: 'FETCH_INIT';
    }
  | {
      type: 'FETCH_COMPLETED';
      payload?: Result;
    };

type CreateApiOptions = {
  request: AsyncFn;
  cacheClient: CacheApi;
};

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

function createApi({ request, cacheClient: cacheApi }: CreateApiOptions) {
  const createQuery = <Arg, Result, ApiRequest, ApiResponse>(
    transformParams: Fn<Arg, ApiRequest>,
    transformResponse: Fn<ApiResponse, Result>,
  ): Fn<Arg, Result> => {
    const asyncRequestFn: AsyncFn<Arg, Result> = async (arg) => {
      const requestArg = transformParams(arg);
      const response = await (request as AsyncFn<ApiRequest, ApiResponse>)(
        requestArg,
      );
      return transformResponse(response);
    };
    const cachedRequestFn = cacheApi.cache(asyncRequestFn);
    const requestFn: Fn<Arg, Result> = (arg) => use(cachedRequestFn(arg));
    return requestFn;
  };

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
      const requestFn = async (arg: Arg) => {
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
  cacheClient: createMemCache({ duration: 5000 }),
});
