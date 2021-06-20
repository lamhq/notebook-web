import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SelectProps } from '@material-ui/core/Select';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { TimeRangeSelect } from '.';

export default {
  title: 'Atoms/TimeRangeSelect',
  component: TimeRangeSelect,
} as Meta;

const Template: Story<SelectProps> = () => {
  const [value, setValue] = React.useState('');
  const handleChange: SelectInputProps['onChange'] = (event) => {
    setValue(event.target.value as string);
  };
  return <TimeRangeSelect value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = { value: '' };
