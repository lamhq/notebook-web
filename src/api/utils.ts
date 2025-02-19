/* eslint-disable @typescript-eslint/no-explicit-any */
import { use, useEffect, useReducer, useRef, useState } from 'react';
import type { CacheFn } from './cache';
import cache from './cache';
import { axiosRequest, type RequestFn } from './request';

type QueryFn<Args extends any[], Result> = (
  requestFn: RequestFn,
  ...args: Args
) => Promise<Result>;

type MutationState<Result> = {
  data?: Result;
  error?: Error;
  isLoading: boolean;
};

type MutationEvent<Result> =
  | {
      type: 'FETCH_INIT';
    }
  | {
      type: 'FETCH_COMPLETED';
      payload: Result;
    }
  | {
      type: 'FETCH_ERROR';
      error: Error;
    };

function mutationReducer<T>(state: MutationState<T>, action: MutationEvent<T>) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true };

    case 'FETCH_COMPLETED':
      return { ...state, isLoading: false, data: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error };

    default:
      throw new Error('Invalid reducer action');
  }
}

class ApiUtils {
  public constructor(
    private readonly requestFn: RequestFn,
    private readonly cacheFn: CacheFn,
  ) {}

  public createQuery<Args extends any[], Result>(getData: QueryFn<Args, Result>) {
    const execQueryFn = async (...args: Args) => getData(this.requestFn, ...args);
    const { cachedFn: cachedQueryFn, clearCache } = this.cacheFn(execQueryFn);
    // return a hook for data fetching
    return (...args: Args) => {
      const data = use(cachedQueryFn(...args));
      const [, setFlag] = useState(false);
      const refetch = () => {
        clearCache();
        setFlag((prev) => !prev);
      };
      return { data, refetch };
    };
  }

  public createMutation<Args extends any[], Result>(
    updateData: QueryFn<Args, Result>,
  ) {
    // return a hook for data mutation
    return () => {
      const initialState: MutationState<Result> = {
        isLoading: false,
      };
      const [state, dispatch] = useReducer(mutationReducer, initialState);
      const isMounted = useRef(false);
      const executeMutation = async (...args: Args) => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await updateData(this.requestFn, ...args);

          if (isMounted.current) {
            dispatch({ type: 'FETCH_COMPLETED', payload: result });
          }
          return result;
        } catch (error) {
          if (isMounted.current && error instanceof Error) {
            dispatch({ type: 'FETCH_ERROR', error });
          }
          throw error;
        }
      };

      // set flag to detect if component is still mounted
      useEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);

      return { executeMutation, ...state };
    };
  }
}

const apiUtils = new ApiUtils(axiosRequest, cache);

export const createQuery = apiUtils.createQuery.bind(apiUtils);

export const createMutation = apiUtils.createMutation.bind(apiUtils);
