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

const Template: Story = {
  args: {
    value: new Date(),
    onChange: fn(),
  },
};

export const Default: Story = {
  ...Template,
  render: (args) => {
    const [{ value, onChange: sbOnChange }, updateArgs] =
      useArgs<DateTimePickerProps>();
    const onChange: DateTimePickerProps['onChange'] = (newVal, context) => {
      updateArgs({ value: newVal });
      sbOnChange?.(newVal, context);
    };
    return <DateTimePicker {...args} onChange={onChange} value={value} />;
  },
};
