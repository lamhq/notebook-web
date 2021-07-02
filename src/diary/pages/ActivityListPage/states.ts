import { selector, atom } from 'recoil';
import { apiState } from '../../../api';
import { ActivityFilterDto } from '../../../api/types';
import { Activity, ActivityFilterModel, TimeRange } from '../../types';

export const activityFilterState = atom<ActivityFilterModel>({
  key: 'diary/activityFilter',
  default: {
    text: '',
    tags: [],
    timeRange: TimeRange.ThisMonth,
    from: new Date(),
    to: new Date(),
  },
});

export const filteredActivitiesState = selector<Activity[]>({
  key: 'diary/activities', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    console.log('get filtered ActivitiesState');
    const apiClient = await get(apiState);
    console.log('apiClient available');
    const filter = get(activityFilterState);
    const dto: ActivityFilterDto = {
      ...filter,
      limit: 10,
      offset: 0,
    };
    return apiClient.searchActivities(dto);
  },
});
