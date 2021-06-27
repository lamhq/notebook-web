import numeral from 'numeral';

export function formatNumber(n: number): string {
  return numeral(n).format('0,0.[00]');
}

export function hasSubArray(master: string[], sub: string[]): boolean {
  return master && sub && sub.every((value, index) => master.indexOf(value, index) + 1 > 0);
}
