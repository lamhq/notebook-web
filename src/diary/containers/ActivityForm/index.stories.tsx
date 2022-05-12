import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ActivityForm, { ActivityFormProps } from '.';

export default {
  title: 'Containers/ActivityEditForm',
  component: ActivityForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ActivityFormProps> = (args) => {
  const { onSubmit } = args;
  return <ActivityForm onSubmit={onSubmit} activityId="1123" />;
};

export const Default = Template.bind({});
