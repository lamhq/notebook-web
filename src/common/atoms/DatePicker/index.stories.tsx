import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { DatePicker, DateTimePicker, DatePickerProps, DateTimePickerProps } from '.';

export default {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  argTypes: { onChange: { action: 'onChange' } },
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const { value, onChange } = args;
  return <DatePicker value={value} onChange={onChange} />;
};

const DateTimeTemplate: Story<DateTimePickerProps> = (args) => {
  const { value, onChange } = args;
  return <DateTimePicker value={value} onChange={onChange} />;
};

export const DatePickerControl = Template.bind({});
DatePickerControl.args = { value: new Date() };

export const DateTimePickerControl = DateTimeTemplate.bind({});
DateTimePickerControl.args = { value: new Date() };
