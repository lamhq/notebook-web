import { atom } from 'jotai';
import { TimeRange, type ActivityFilter } from './types';

export const activityFilterAtom = atom<ActivityFilter>({
  text: '',
  tags: [],
  timeRange: TimeRange.ThisMonth,
  from: new Date(),
  to: new Date(),
  page: 1,
  pageSize: 10,
});
