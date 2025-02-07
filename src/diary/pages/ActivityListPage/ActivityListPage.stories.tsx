import type { Meta, StoryObj } from '@storybook/react';

import ActivityListPage from './ActivityListPage';

const meta = {
  component: ActivityListPage,
} satisfies Meta<typeof ActivityListPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
