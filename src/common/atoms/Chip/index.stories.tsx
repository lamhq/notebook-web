import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ChipProps } from '@material-ui/core/Chip';
import Chip from '.';

export default {
  title: 'Atoms/Chip',
  component: Chip,
} as Meta;

const Template: Story<ChipProps> = (args) => {
  const { label, size } = args;
  return <Chip label={label} size={size} />;
};

export const Default = Template.bind({});
Default.args = { label: 'play', size: 'small' };
