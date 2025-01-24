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

function createApi<RequestArg, Response>(
  request: AsyncFn<RequestArg, Response>,
  { cache }: CacheApi,
) {
  const createQuery = <Arg, Result>(
    transformParams: Fn<Arg, RequestArg>,
    transformResponse: Fn<Response, Result>,
  ): Fn<Arg, Result> => {
    const asyncRequestFn: AsyncFn<Arg, Result> = async (arg) => {
      const p = transformParams(arg);
      const r = await request(p);
      return transformResponse(r);
    };
    const cachedRequestFn = cache(asyncRequestFn);
    const requestFn: Fn<Arg, Result> = (arg) => use(cachedRequestFn(arg));
    return requestFn;
  };

  const createMutation = <Arg, Result>(
    transformParams: Fn<Arg, RequestArg>,
    transformResponse: Fn<Response, Result>,
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
          const p = transformParams(arg);
          const r = await request(p);
          const result = transformResponse(r);
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

export const { createQuery, createMutation } = createApi(
  createAxiosRequest({ baseURL: '/api' }),
  createMemCache({ duration: 5000 }),
);
