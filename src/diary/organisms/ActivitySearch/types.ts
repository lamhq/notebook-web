import type { TimeRange } from "../../types";

export interface ActivityFilterModel {
  text: string;
  tags: string[];
  timeRange: TimeRange;
  page: number;
  pageSize: number;
  from?: Date;
  to?: Date;
}
