import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DateTimePicker, { type DateTimePickerProps } from './DateTimePicker';

const meta = {
  component: DateTimePicker,
  argTypes: {
    value: { control: 'date' },
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: new Date(),
    onChange: fn(),
  },
  render: function Render(args) {
    const [{ value, onChange: sbOnChange }, updateArgs] = useArgs();

    const onChange: DateTimePickerProps['onChange'] = (newVal) => {
      updateArgs({ value: newVal });
      sbOnChange(newVal);
    };

    return <DateTimePicker {...args} onChange={onChange} value={value} />;
  },
};
