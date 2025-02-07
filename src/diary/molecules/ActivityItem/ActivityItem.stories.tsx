import type { Meta, StoryObj } from '@storybook/react';

import { MemoryRouter } from 'react-router';
import ActivityItem from './ActivityItem';

const meta = {
  component: ActivityItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ActivityItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activity: {
      id: '1',
      time: new Date('2021-06-15T01:21:03.368Z'),
      tags: ['play', 'gog'],
      income: 100.0,
      outcome: 230.0,
      content: 'abc\ndef\nghi',
    },
  },
};
