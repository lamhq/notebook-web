import React from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { activityFilterState } from '../../states';
import { useAsyncData } from '../../../common/hooks';
import { useApi } from '../../../api';
import RevenueView from '../../atoms/Revenue';

function useRevenue() {
  const api = useApi();
  const filter = useRecoilValue(activityFilterState);
  const data = useAsyncData(api.getRevenue, filter);
  return data;
}

export const RevenueLoader: React.VFC = () => {
  const data = useRevenue();
  if (typeof data === 'undefined') return null;

  const { income, outcome } = data;
  return <RevenueView income={income} outcome={outcome} />;
};

const errorFallbackRender = () => null;

const Revenue: React.VFC = () => {
  return (
    <ErrorBoundary fallbackRender={errorFallbackRender}>
      <React.Suspense fallback="">
        <RevenueLoader />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Revenue;
