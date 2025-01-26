import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DatePicker, { type DatePickerProps } from './DatePicker';

const meta = {
  component: DatePicker,
  argTypes: {
    value: { control: 'date' },
  },
} satisfies Meta<typeof DatePicker>;

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
    const [{ value, onChange: sbOnChange }, updateArgs] = useArgs<DatePickerProps>();
    const onChange: DatePickerProps['onChange'] = (newVal, context) => {
      updateArgs({ value: newVal });
      sbOnChange?.(newVal, context);
    };
    return <DatePicker {...args} onChange={onChange} value={value} />;
  },
};
