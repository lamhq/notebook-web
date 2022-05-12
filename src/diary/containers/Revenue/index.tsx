import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { activityFilterState } from '../../states';
import { useAsyncData } from '../../../common/hooks';
import { useApi } from '../../../api';
import RevenueView from '../../atoms/Revenue';
import { ApiErrorBoundary } from '../../../error';

function useRevenue() {
  const api = useApi();
  const filter = useRecoilValue(activityFilterState);
  const loadRevenue = useCallback(() => api.getRevenue(filter), [filter, api]);
  const data = useAsyncData(loadRevenue);
  return data;
}

export const RevenueLoader: React.VFC = () => {
  const data = useRevenue();
  if (data === undefined) return null;

  const { income, outcome } = data;
  return <RevenueView income={income} outcome={outcome} />;
};

const Revenue: React.VFC = () => {
  return (
    <ApiErrorBoundary displayError={false}>
      <RevenueLoader />
    </ApiErrorBoundary>
  );
};

export default Revenue;
