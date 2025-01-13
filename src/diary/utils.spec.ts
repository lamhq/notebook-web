import { describe, expect, it } from '@jest/globals';
import { getTotalAmounts, getTransAmounts } from './utils';

describe('getTransAmounts', () => {
  it('should calculate the income in a transaction line', () => {
    expect.assertions(1);
    expect(getTransAmounts('nhận lương tháng 11 20000k')).toBe(20000);
  });

  it('should calculate the outcome in a transaction line', () => {
    expect.assertions(1);
    expect(getTransAmounts('mua hàng 30K')).toBe(-30);
  });

  it('should sum the outcome in a transaction line', () => {
    expect.assertions(1);
    expect(getTransAmounts('mua bánh bao 24k nước ngọt 18k')).toBe(-42);
  });
});

describe('getTotalAmounts', () => {
  it('should calculate the income and outcome in a transaction note', () => {
    expect.assertions(1);
    expect(
      getTotalAmounts('nhận lương tháng 11 20000k\nmua hàng 30k'),
    ).toStrictEqual([20000, 30]);
  });
});
