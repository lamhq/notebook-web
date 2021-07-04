import { selector } from 'recoil';
import { getApiClient } from '../api';

export const tagListState = selector<string[]>({
  key: 'diary/tags', // unique ID (with respect to other atoms/selectors)
  get: async () => {
    const apiClient = await getApiClient();
    return apiClient.getTags();
  },
});
