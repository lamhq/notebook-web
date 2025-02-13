import type { Fn } from './types';

const DEFAULT_CACHE_DURATION = 1000 * 60 * 1; // 1 minutes

/**
 * The result when calling cache() function
 */
export type CacheResult<Arg, Result> = {
  /**
   * The cached function, it won't call the original function if the result is cached
   */
  cachedFn: Fn<Arg, Result>;

  /**
   * Clear the cache
   */
  clearCache: () => void;
};

/**
 * Cache the result of a function base on arguments
 * See https://react.dev/reference/react/cache
 */
export default function cache<Arg, Result>(
  fn: Fn<Arg, Result>,
  duration: number = DEFAULT_CACHE_DURATION,
): CacheResult<Arg, Result> {
  const store = new Map<string, { timestamp: number; result: Result }>();

  const cachedFn: Fn<Arg, Result> = (arg) => {
    const now = Date.now();
    const key = JSON.stringify(arg);
    const cachedRes = store.get(key);

    // return cached value, if not expired
    if (cachedRes !== undefined && now - cachedRes.timestamp < duration) {
      return cachedRes.result;
    }

    // cache miss, calling the original function and save the result to cache
    const result = fn(arg);
    store.set(key, { timestamp: now, result });

    // if result is a rejected promise, remove it from cache
    if (result instanceof Promise) {
      result.catch(() => {
        setTimeout(() => store.delete(key), 10);
      });
    }

    return result;
  };

  const clearCache = () => {
    store.clear();
  };

  return {
    cachedFn,
    clearCache,
  };
}
