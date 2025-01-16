import { describe, expect, it, jest } from '@jest/globals';
import { cache } from './cache';

describe('cache function', () => {
  it('should cache the result of the function', () => {
    expect.hasAssertions();

    const fn = jest.fn((x: number) => x * 2);
    const cachedFn = cache(fn, 1000);

    expect(cachedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(cachedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1); // Should still be 1, result is cached
  });

  it('should call the function again after cache expires', async () => {
    expect.hasAssertions();

    const fn = jest.fn((x: number) => x * 2);
    const cachedFn = cache(fn, 10);

    expect(cachedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);

    await new Promise<void>((rs) => {
      setTimeout(() => {
        expect(cachedFn(2)).toBe(4);
        expect(fn).toHaveBeenCalledTimes(2);

        rs();
      }, 15);
    });
  });

  it('should cache results for different parameters separately', () => {
    expect.hasAssertions();

    const fn = jest.fn((x: number) => x * 2);
    const cachedFn = cache(fn, 1000);

    expect(cachedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(cachedFn(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
