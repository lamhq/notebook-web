import React from 'react';
import { useSetRecoilState } from 'recoil';
import { activityFilterState } from './states';

interface RefreshFn {
  (): unknown;
}

export function useLoadActivityList(): RefreshFn {
  const setFilter = useSetRecoilState(activityFilterState);
  return React.useCallback(() => setFilter((filter) => ({ ...filter })), [setFilter]);
}
