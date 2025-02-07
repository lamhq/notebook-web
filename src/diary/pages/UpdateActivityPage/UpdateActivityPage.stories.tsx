import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import UpdateActivityPage from './UpdateActivityPage';

const meta = {
  component: UpdateActivityPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/diary/activities/1']}>
        <Routes>
          <Route path="/diary/activities/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof UpdateActivityPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
