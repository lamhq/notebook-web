import { atom } from 'jotai';
import { TimeRange, type ActivityFilter } from './types';

/**
 * Store the filter of activities
 */
export const activityFilterAtom = atom<ActivityFilter>({
  text: '',
  tags: [],
  timeRange: TimeRange.ThisMonth,
  from: new Date(),
  to: new Date(),
  page: 1,
  pageSize: 10,
});

/**
 * Store the event handler to notify `ActivitityList` to refetch the activities
 *
 * The `onActivityChanged` handler should be called when an activity is added, updated, or deleted
 */
export const onActivityChangedAtom = atom<{ onActivityChanged: () => void }>({
  onActivityChanged: () => undefined,
});
