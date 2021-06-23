import numeral from 'numeral';

export function formatNumber(n: number): string {
  return numeral(n).format('0,0.[00]');
}
