import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import subMonths from 'date-fns/subMonths';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import { ActivityFilterModel, TimeRange } from './types';

export function getTimeRangeFromFilter(filter: ActivityFilterModel): [Date?, Date?] {
  let from: Date | undefined;
  let to: Date | undefined;
  switch (filter.timeRange) {
    case TimeRange.ThisWeek:
      from = startOfWeek(new Date(), { weekStartsOn: 1 });
      to = endOfWeek(new Date(), { weekStartsOn: 1 });
      break;

    case TimeRange.ThisMonth:
      from = startOfMonth(new Date());
      to = endOfMonth(new Date());
      break;

    case TimeRange.ThisYear:
      from = startOfYear(new Date());
      to = endOfYear(new Date());
      break;

    case TimeRange.LastMonth:
      from = startOfMonth(subMonths(new Date(), 1));
      to = endOfMonth(subMonths(new Date(), 1));
      break;

    case TimeRange.Custom:
      if (!filter.from || !filter.to) {
        throw new Error('Invalid custom time range');
      }

      from = startOfDay(filter.from);
      to = endOfDay(filter.to);
      break;

    default:
      break;
  }
  return [from, to];
}

export function buildQueryFromFilter(
  filter: ActivityFilterModel,
): Record<string, string | string[] | number> {
  const params: ReturnType<typeof buildQueryFromFilter> = {};
  if (filter.text) {
    params.text = filter.text;
  }

  if (filter.tags) {
    params.tags = filter.tags;
  }

  const [from, to] = getTimeRangeFromFilter(filter);
  if (from) {
    params.from = from.toISOString();
  }
  if (to) {
    params.to = to.toISOString();
  }

  params.limit = filter.pageSize;
  params.offset = (filter.page - 1) * filter.pageSize;
  return params;
}
