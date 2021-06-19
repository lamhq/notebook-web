import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextFieldProps } from '@material-ui/core/TextField';
import { TextField } from '.';

export default {
  title: 'Atoms/TextField',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => {
  const { label, placeholder, onChange } = args;
  return <TextField label={label} placeholder={placeholder} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Label', placeholder: 'Enter text' };
