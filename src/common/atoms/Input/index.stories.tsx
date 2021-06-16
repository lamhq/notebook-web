import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input, InputProps } from '.';

export default {
  title: 'Atoms/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => {
  const { label, placeholder, onChange } = args;
  return <Input label={label} placeholder={placeholder} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Label', placeholder: 'Enter text' };
