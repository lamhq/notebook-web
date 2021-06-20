import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ActivitySearchForm } from '.';

export default {
  title: 'Organisms/ActivitySearchForm',
  component: ActivitySearchForm,
} as Meta;

const Template: Story = () => {
  return <ActivitySearchForm />;
};

export const Default = Template.bind({});
// Default.args = { };
