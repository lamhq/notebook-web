import type { Meta, StoryObj } from '@storybook/react';

import Revenue from './Revenue';

const meta = {
  component: Revenue,
} satisfies Meta<typeof Revenue>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    income: 0,
    outcome: 0,
  },
};
