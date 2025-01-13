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

export interface ActivityFilterModel {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  page: number;
  pageSize: number;
  from?: Date;
  to?: Date;
}
