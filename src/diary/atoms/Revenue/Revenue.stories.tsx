import type { Meta, StoryObj } from '@storybook/react';

import Revenue from './Revenue';

const meta = {
  component: Revenue,
} satisfies Meta<typeof Revenue>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    income: 500,
    outcome: 200,
  },
};

export const Negative: Story = {
  args: {
    income: 100,
    outcome: 200,
  },
};
