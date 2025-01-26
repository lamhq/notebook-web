import type { Meta, StoryObj } from '@storybook/react';

import ActivityTagSelect from './ActivityTagSelect';

const meta = {
  component: ActivityTagSelect,
} satisfies Meta<typeof ActivityTagSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
