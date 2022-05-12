import { atom } from 'recoil';
import { ActivityFilterModel, TimeRange } from './types';

export const activityFilterState = atom<ActivityFilterModel>({
  key: 'diary/activityFilter',
  default: {
    text: '',
    tags: [],
    timeRange: TimeRange.ThisMonth,
    from: new Date(),
    to: new Date(),
    page: 1,
    pageSize: 10,
  },
});
