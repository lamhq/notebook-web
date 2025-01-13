import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Pagination, { type PaginationProps } from './Pagination';

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 20,
    onChange: fn(),
  },
  render: function Render() {
    const [{ onChange: sbOnChange, ...rest }, updateArgs] = useArgs();

    const onChange: PaginationProps['onChange'] = (newVal) => {
      updateArgs({ value: newVal });
      sbOnChange(newVal);
    };

    return <Pagination {...rest} onChange={onChange} />;
  },
};
