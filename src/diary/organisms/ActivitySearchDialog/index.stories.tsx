import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ActivitySearchDialog } from '.';

export default {
  title: 'Organisms/ActivitySearchDialog',
  component: ActivitySearchDialog,
} as Meta;

const Template: Story = () => {
  return <ActivitySearchDialog />;
};

export const Default = Template.bind({});
// Default.args = { };
