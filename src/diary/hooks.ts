import React from 'react';
import { useSetRecoilState } from 'recoil';
import { activityFilterState } from './states';

interface RefreshFn {
  (): void;
}

export function useRefreshActivityList(): RefreshFn {
  const setFilter = useSetRecoilState(activityFilterState);
  return React.useCallback(() => setFilter((filter) => ({ ...filter })), [setFilter]);
}
