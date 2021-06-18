import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextFieldProps as InputProps } from '@material-ui/core/TextField';
import { TextField } from '.';

export default {
  title: 'Atoms/Input',
  component: TextField,
} as Meta;

const Template: Story<InputProps> = (args) => {
  const { label, placeholder, onChange } = args;
  return <TextField label={label} placeholder={placeholder} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Label', placeholder: 'Enter text' };
