import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Chip, ChipProps } from '.';

export default {
  title: 'Atoms/Chip',
  component: Chip,
} as Meta;

const Template: Story<ChipProps> = (args) => {
  const { label } = args;
  return <Chip label={label} />;
};

export const Default = Template.bind({});
Default.args = { label: 'play' };
