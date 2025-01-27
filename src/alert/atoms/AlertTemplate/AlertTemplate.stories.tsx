import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AlertTemplate from './AlertTemplate';

const meta = {
  component: AlertTemplate,
} satisfies Meta<typeof AlertTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'success',
    message: 'A sample alert message',
    remove: fn(),
  },
};
