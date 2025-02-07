import type { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage';

const meta = {
  component: NotFoundPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
