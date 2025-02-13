import type { AxiosHeaderValue } from 'axios';
import { createMutation, createQuery } from '../common/api';
import { removeEmptyFields } from '../common/utils';
import type { Activity, ActivityFilter, ActivityFormData, Revenue } from './types';
import { buildQueryFromFilter } from './utils';

export const useGetTagsQuery = createQuery(
  () => ({
    url: `/diary/tags`,
    method: 'GET',
  }),
  (resp: { data: string[] }) => resp.data,
);

export const useGetActivitiesQuery = createQuery(
  (filter?: ActivityFilter) => ({
    url: '/diary/activities',
    method: 'GET',
    params: buildQueryFromFilter(filter),
  }),
  (resp: {
    data: Activity[];
    headers: Record<string, AxiosHeaderValue | undefined>;
  }) => {
    const hVal = resp.headers['x-total-count'];
    const total = typeof hVal === 'string' ? parseInt(hVal, 10) : 0;
    return [resp.data, total] as const;
  },
);

export const useGetRevenueQuery = createQuery(
  (filter: ActivityFilter) => {
    const params = buildQueryFromFilter(filter);
    return {
      url: '/diary/stat/revenue',
      method: 'GET',
      params: params,
    };
  },
  (resp: { data: Revenue }) => resp.data,
);

export const useGetActivityQuery = createQuery(
  (id: string) => ({
    url: `/diary/activities/${id}`,
    method: 'GET',
  }),
  (resp: { data: Activity }) => resp.data,
);

export const useAddActivityMutation = createMutation(
  (data: ActivityFormData) => ({
    url: `/diary/activities`,
    method: 'POST',
    data: removeEmptyFields(data),
  }),
  (resp: { data: Activity }) => resp.data,
);

export const useUpdateActivityMutation = createMutation(
  (data: Activity) => {
    const { id, ...rest } = data;
    return {
      url: `/diary/activities/${id}`,
      method: 'PUT',
      data: removeEmptyFields(rest),
    };
  },
  (resp: { data: Activity }) => resp.data,
);

export const useDeleteActivityMutation = createMutation(
  (id: string) => ({
    url: `/diary/activities/${id}`,
    method: 'DELETE',
  }),
  (resp: { data: null }) => resp.data,
);
