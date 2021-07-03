export interface Activity {
  id: string;
  content: string;
  time: string;
  tags: string[];
  income: number;
  outcome: number;
}

export interface ActivityTag {
  id: string;
  name: string;
}

export interface ActivityFormModel {
  content: string;
  time: Date;
  tags: string[];
  income: number;
  outcome: number;
}

export enum TimeRange {
  ThisMonth = 'this-month',
  LastMonth = 'last-month',
  ThisYear = 'this-year',
  Custom = 'custom',
}

export interface ActivityFilterModel {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  from: Date;
  to: Date;
  page: number;
  pageSize: number;
}
