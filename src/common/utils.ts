import numeral from 'numeral';
import { FieldValues } from 'react-hook-form';

export function formatNumber(n?: number): string {
  return n ? numeral(n).format('0,0.[00]') : '0';
}

export function removeEmptyFields<T extends FieldValues>(data: T): T {
  return Object.entries(data).reduce((current, [key, value]) => {
    return value ? { ...current, [key]: value as unknown } : current;
  }, {} as T);
}
