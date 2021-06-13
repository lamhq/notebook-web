import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { TimeLabel, TimeLabelProps } from '.';

export default {
  title: 'Atoms/TimeLabel',
  component: TimeLabel,
} as Meta;

const Template: Story<TimeLabelProps> = (args) => {
  const { time } = args;
  return <TimeLabel time={time} />;
};

export const Default = Template.bind({});
Default.args = { time: new Date() };
