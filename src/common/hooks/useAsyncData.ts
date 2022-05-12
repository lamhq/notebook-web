import { useEffect, useCallback, useReducer, Reducer } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchDataFn = () => Promise<any>;

enum FetchActionType {
  START = 'START',
  FINISH = 'FINISH',
  ERROR = 'ERROR',
}

interface FetchAction<T> {
  type: FetchActionType;
  data?: T;
  error?: unknown;
}

interface FetchState<T> {
  data?: T;
  error?: unknown;
}

function reducer<T>(prevState: FetchState<T>, action: FetchAction<T>): FetchState<T> {
  switch (action.type) {
    case FetchActionType.START:
      return { data: undefined, error: undefined };
    case FetchActionType.FINISH:
      return { data: action.data, error: undefined };
    case FetchActionType.ERROR:
      return { data: undefined, error: action.error };
    default:
      throw new Error('Unknown reducer action');
  }
}

export default function useAsyncData<T extends FetchDataFn>(
  fn: T,
): Awaited<ReturnType<T>> | undefined {
  const [state, dispatch] = useReducer<
    Reducer<FetchState<Awaited<ReturnType<T>>>, FetchAction<Awaited<ReturnType<T>>>>
  >(reducer, {
    data: undefined,
    error: undefined,
  });
  const load = useCallback(async () => {
    try {
      dispatch({ type: FetchActionType.START });
      const fetchData = await fn();
      dispatch({ type: FetchActionType.FINISH, data: fetchData });
    } catch (error) {
      dispatch({ type: FetchActionType.ERROR, error });
    }
  }, [fn, dispatch]);

  if (state.error) {
    throw state.error;
  }

  useEffect(() => {
    load();
  }, [load]);

  return state.data;
}
