import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PaginationProps } from '@material-ui/lab/Pagination';
import Pagination from '.';

export default {
  title: 'Molecules/Pagination',
  argTypes: { onChange: { action: 'changed' } },
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => {
  return <Pagination count={args.count} onChange={args.onChange} />;
};

export const Default = Template.bind({});
Default.args = {
  count: 20,
};
