import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ActivityItem, ActivityItemProps } from '.';

export default {
  title: 'Molecules/ActivityItem',
  component: ActivityItem,
} as Meta;

const Template: Story<ActivityItemProps> = (args) => {
  const { model } = args;
  return <ActivityItem model={model} />;
};

export const Default = Template.bind({});
const model = {
  time: new Date(),
  tags: ['play', 'gog'],
  income: 0,
  outcome: 0,
  content: 'abc\ndef\nghi',
};
Default.args = { model };
