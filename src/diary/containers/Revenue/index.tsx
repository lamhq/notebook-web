import React from 'react';
import { useRecoilValue } from 'recoil';
import { revenueState } from './states';
import RevenueView from '../../atoms/Revenue';

export const LoadableRevenue: React.VFC = () => {
  const { income, outcome } = useRecoilValue(revenueState);
  return <RevenueView income={income} outcome={outcome} />;
};

const Revenue: React.VFC = () => {
  return (
    <React.Suspense fallback="">
      <LoadableRevenue />
    </React.Suspense>
  );
};

export default Revenue;
