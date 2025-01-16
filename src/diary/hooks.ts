import { createMutation, createQuery } from '../common/api';
import type { AxiosRequestFn } from '../common/request';
import { request } from '../common/request';
import { removeEmptyFields } from '../common/utils';
import type { Activity, ActivityFilter, ActivityForm, Revenue } from './types';
import { buildQueryFromFilter } from './utils';

export const useGetActivitiesQuery = createQuery({
  request: request as AxiosRequestFn<Activity[], void>,
  params: (filter: ActivityFilter) => ({
    url: '/diary/activities',
    method: 'GET',
    params: buildQueryFromFilter(filter),
  }),
  transformResponse: (resp, filter) => {
    const total = parseInt(resp.headers['x-total-count'] as string, 10);
    return [resp.data, Math.ceil(total / filter.pageSize)] as const;
  },
});

export const useGetRevenueQuery = createQuery({
  request: request as AxiosRequestFn<Revenue, void>,
  params: (filter: ActivityFilter) => {
    const params = buildQueryFromFilter(filter);
    if (!params.from || !params.to) {
      const now = new Date();
      params.from = now.toISOString();
      params.to = now.toISOString();
    }
    return {
      url: '/diary/stat/revenue',
      method: 'GET',
      params: params,
    };
  },
  transformResponse: (resp) => resp.data,
});

export const useGetActivityQuery = createQuery({
  request: request as AxiosRequestFn<Activity, void>,
  params: (id: string) => ({
    url: `/diary/activities/${id}`,
    method: 'GET',
  }),
  transformResponse: (resp) => resp.data,
});

export const useAddActivityMutation = createMutation({
  request: request as AxiosRequestFn<Activity, ActivityForm>,
  params: (data: ActivityForm) => ({
    url: `/diary/activities`,
    method: 'POST',
    data: removeEmptyFields(data),
  }),
  transformResponse: (resp) => resp.data,
});

export const useUpdateActivityMutation = createMutation({
  request: request as AxiosRequestFn<Activity, ActivityForm>,
  params: ({ id, data }: { id: string; data: ActivityForm }) => ({
    url: `/diary/activities/${id}`,
    method: 'PUT',
    data: removeEmptyFields(data),
  }),
  transformResponse: (resp) => resp.data,
});

export const useDeleteActivityMutation = createMutation({
  request: request as AxiosRequestFn<void, string>,
  params: (id: string) => ({
    url: `/diary/activities/${id}`,
    method: 'DELETE',
  }),
  transformResponse: (resp) => resp.data,
});

export const useGetTagsQuery = createQuery({
  request: request as AxiosRequestFn<string[], void>,
  params: () => ({
    url: `/diary/tags`,
    method: 'GET',
  }),
  transformResponse: (resp) => resp.data,
});
