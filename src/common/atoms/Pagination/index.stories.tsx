import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Pagination, { PaginationProps } from '.';

export default {
  title: 'Atoms/Pagination',
  argTypes: { onChange: { action: 'changed' } },
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => {
  const { count, onChange } = args;
  return <Pagination count={count} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {
  count: 20,
};
