import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import { TimeRange } from '../../types';
import ActivitySearch from './ActivitySearch';

const meta = {
  component: ActivitySearch,
} satisfies Meta<typeof ActivitySearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: {
      text: '',
      tags: [],
      timeRange: TimeRange.ThisMonth,
      from: new Date('2018-07-03'),
      to: new Date('2021-07-03'),
      page: 1,
      pageSize: 10,
    },
    onSubmit: fn(),
  },
};
