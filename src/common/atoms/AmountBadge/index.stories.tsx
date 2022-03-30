import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import AmountBadge, { AmountProps } from '.';

export default {
  title: 'Atoms/AmountBadge',
  component: AmountBadge,
} as Meta;

const Template: Story<AmountProps> = (args) => {
  const { amount, isIncome: income } = args;
  return <AmountBadge amount={amount} isIncome={income} />;
};

export const Default = Template.bind({});
Default.args = { amount: 74499, isIncome: true };
