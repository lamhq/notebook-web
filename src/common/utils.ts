import { format } from 'date-fns';
import numeral from 'numeral';
import type { FieldValues } from 'react-hook-form';

export function formatNumber(n?: number): string {
  return n ? numeral(n).format('0,0.[00]') : '0';
}

export function formatDate(date?: Date, dateFormat = 'EEE, d LLL, yyyy'): string {
  return date ? format(date, dateFormat) : '';
}

export function formatTime(date?: Date, timeFormat = 'h:mm aaa'): string {
  return date ? format(date, timeFormat) : '';
}

export function removeEmptyFields(data: FieldValues): FieldValues {
  return Object.entries(data).reduce((current, [key, value]) => {
    return value ? { ...current, [key]: value as unknown } : current;
  }, {});
}

export function getAbsoluteURL(route: string) {
  return `${window.location.protocol}//${window.location.host}${route}`;
}
