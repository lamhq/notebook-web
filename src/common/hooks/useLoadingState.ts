import React, { Reducer } from 'react';

interface LoadingState<T> {
  loading: boolean;
  error?: Error;
  data?: T;
}

/**
 * Available options to customize hook's behavior
 */
interface LoadOptions {
  /**
   * whether async function will be called automatically
   * usecase: fetching data on page load
   */
  autoFetch: boolean;
}

interface Action<T> {
  type: 'start' | 'load-finish' | 'load-error';
  data?: T;
  error?: Error;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFn<T> = (...arg: any[]) => Promise<T | undefined>;

/**
 * Return initial state base on configuration
 */
function init<T>(config: LoadOptions): LoadingState<T> {
  const initialState = {
    data: undefined,
    error: undefined,
    loading: config.autoFetch,
  };
  return initialState;
}

function reducer<T>(state: LoadingState<T>, action: Action<T>): LoadingState<T> {
  switch (action.type) {
    case 'start':
      return { loading: true, data: undefined, error: undefined };

    case 'load-finish':
      return { loading: false, data: action.data, error: undefined };

    case 'load-error':
      return { loading: false, data: undefined, error: action.error };

    default:
      throw new Error('unrecognized dispatch action');
  }
}

/**
 * React hook that manage loading state for async function
 */
export default function useLoadingState<T>(
  fn: AsyncFn<T>,
  config: Partial<LoadOptions> = {},
): { load: AsyncFn<T> } & LoadingState<T> {
  const options: LoadOptions = { autoFetch: true, ...config };
  const [state, dispatch] = React.useReducer<Reducer<LoadingState<T>, Action<T>>, LoadOptions>(
    reducer,
    options,
    init,
  );

  const load: AsyncFn<T> = React.useCallback(
    async (...params) => {
      try {
        // only dispatch start loading event if async function is
        // not called automatically on startup or it's not the first run
        if (!options.autoFetch || state.data !== undefined) {
          dispatch({ type: 'start' });
        }
        const res = await fn(...params);
        dispatch({ type: 'load-finish', data: res });
        return res;
      } catch (err) {
        dispatch({ type: 'load-error', error: err });
        // don't throw exception in fetching data mode
        if (options.autoFetch) {
          return undefined;
        }
        throw err;
      }
    },
    [fn, options.autoFetch, state.data],
  );

  React.useEffect(() => {
    if (options.autoFetch) {
      load();
    }
  }, []);

  return {
    ...state,
    load,
  };
}
