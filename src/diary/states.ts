import { selector } from 'recoil';
import { getApiClient } from '../api';
import { ActivityTag } from './types';

export const tagListState = selector<ActivityTag[]>({
  key: 'diary/tags', // unique ID (with respect to other atoms/selectors)
  get: async () => {
    const apiClient = await getApiClient();
    return apiClient.getTags();
  },
});
