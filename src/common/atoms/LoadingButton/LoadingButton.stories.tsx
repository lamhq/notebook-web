import type { Meta, StoryObj } from '@storybook/react';

import LoadingButton from './LoadingButton';

const meta = {
  component: LoadingButton,
  argTypes: {
    color: {
      type: 'string',
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
      ],
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
  },
} satisfies Meta<typeof LoadingButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: true,
    variant: 'contained',
    color: 'primary',
    size: 'large',
  },
  render: (args) => <LoadingButton {...args}>Button</LoadingButton>,
};
