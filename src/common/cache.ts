import type { Fn } from './types';

export type CacheApi = {
  cache: <Arg, Result>(arg: Fn<Arg, Result>) => Fn<Arg, Result>;
};

type CacheOptions = {
  duration: number;
};

export function createMemCache(options: CacheOptions): CacheApi {
  const cache = <Arg, Result>(fn: Fn<Arg, Result>): Fn<Arg, Result> => {
    const cacheStore = new Map<string, { timestamp: number; result: Result }>();
    return (arg: Arg): Result => {
      const now = Date.now();
      const cacheKey = JSON.stringify(arg);
      const cached = cacheStore.get(cacheKey);

      // return cached value if not expired
      if (cached !== undefined && now - cached.timestamp < options.duration) {
        return cached.result;
      }

      // cache miss, calling the original function and save the result
      const result = fn(arg);
      cacheStore.set(cacheKey, { timestamp: now, result });

      // if a promise is rejected, remove it from cache
      if (result instanceof Promise) {
        result.catch(() => {
          console.log('delete cache');
          setTimeout(() => cacheStore.delete(cacheKey), 10);
        });
      }

      return result;
    };
  };
  return { cache };
}
