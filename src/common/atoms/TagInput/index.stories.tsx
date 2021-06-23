import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TagInput, TagInputProps } from '.';

export default {
  title: 'Atoms/TagInput',
  component: TagInput,
  argTypes: { onChange: { action: 'onChange' } },
} as Meta;

const Template: Story<TagInputProps> = ({ options, creatable }) => {
  const [value, setValue] = React.useState<string[]>([]);
  return <TagInput value={value} onChange={setValue} options={options} creatable={creatable} />;
};

export const Default = Template.bind({});
Default.args = {
  options: ['abc', 'def', 'ghi'],
  creatable: false,
};

export const Creatable = Template.bind({});
Creatable.args = {
  options: ['abc', 'def', 'ghi'],
  creatable: true,
};
