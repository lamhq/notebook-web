import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import Revenue, { RevenueView, RevenueViewProps } from '.';

export default {
  title: 'Atoms/Revenue',
  component: RevenueView,
} as Meta;

const Template: Story<RevenueViewProps> = (args) => {
  const { income, outcome } = args;
  return <RevenueView income={income} outcome={outcome} />;
};

export const Positive = Template.bind({});
Positive.args = { income: 500, outcome: 200 };

export const Negative = Template.bind({});
Negative.args = { income: 100, outcome: 200 };

export const Loadable = Revenue;
