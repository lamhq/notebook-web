import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import UpdateActivityPage from './UpdateActivityPage';

const meta = {
  component: UpdateActivityPage,
  decorators: [
    (Story) => {
      const navigate = useNavigate();

      useEffect(() => {
        void navigate('/diary/activities/1');
      }, []);

      return (
        <Routes>
          <Route path="/diary/activities/:id" element={<Story />} />
        </Routes>
      );
    },
  ],
} satisfies Meta<typeof UpdateActivityPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
