import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoogleLoginForm, { GoogleLoginFormProps } from '.';

export default {
  title: 'Organisms/GoogleLoginForm',
  component: GoogleLoginForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<GoogleLoginFormProps> = (args) => {
  const { onLoginSuccess } = args;
  return <GoogleLoginForm onLoginSuccess={onLoginSuccess} />;
};

export const Default = Template.bind({});
