/* eslint-disable @typescript-eslint/no-explicit-any */

const DEFAULT_CACHE_DURATION = 1000 * 60 * 1; // 1 minutes

/**
 * A function that accept any number of arguments
 */
type GenericFn<Args extends any[], Result> = (...args: Args) => Result;

type CacheOptions = { duration: number };

export type CacheFn = <Args extends any[], Result>(
  fn: GenericFn<Args, Result>,
  options?: CacheOptions,
) => {
  cachedFn: GenericFn<Args, Result>;
  clearCache: () => void;
};

const cache: CacheFn = <Args extends any[], Result>(
  fn: GenericFn<Args, Result>,
  options?: CacheOptions,
) => {
  const config: CacheOptions = { ...options, duration: DEFAULT_CACHE_DURATION };
  const store = new Map<string, { timestamp: number; result: Result }>();

  const cachedFn: typeof fn = (...args) => {
    const now = Date.now();
    const key = JSON.stringify(args);
    const cachedRes = store.get(key);

    // return cached value, if not expired
    if (cachedRes !== undefined && now - cachedRes.timestamp < config.duration) {
      return cachedRes.result;
    }

    // cache miss, calling the original function and save the result to cache
    const result = fn(...args);
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
};

export default cache;
