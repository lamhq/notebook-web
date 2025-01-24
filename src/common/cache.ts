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
      if (cached !== undefined && now - cached.timestamp < options.duration) {
        return cached.result;
      }

      const result = fn(arg);
      cacheStore.set(cacheKey, { timestamp: now, result });
      return result;
    };
  };
  return { cache };
}
