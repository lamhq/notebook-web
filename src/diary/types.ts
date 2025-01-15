export interface Activity {
  id: string;
  content: string;
  time: string;
  tags: string[];
  income?: number;
  outcome?: number;
}

export interface Revenue {
  income: number;
  outcome: number;
}

export enum TimeRange {
  All = 'all',
  ThisWeek = 'this-week',
  ThisMonth = 'this-month',
  ThisYear = 'this-year',
  LastMonth = 'last-month',
  Custom = 'custom',
}

export interface ActivityFilter {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  page: number;
  pageSize: number;
  from?: Date;
  to?: Date;
}

export interface ActivityForm {
  content: string;
  time: Date;
  tags: string[];
  income: number | '';
  outcome: number | '';
}

export interface ApiClient {
  /* activity */
  searchActivities: (filter: ActivityFilter) => Promise<[Activity[], number]>;
  addActivity: (data: ActivityForm) => Promise<Activity>;
  updateActivity: (id: string, data: ActivityForm) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
  getActivity: (id: string) => Promise<Activity>;

  /* tag */
  getTags: () => Promise<string[]>;
  getRevenue: (filter: ActivityFilter) => Promise<Revenue>;
}
