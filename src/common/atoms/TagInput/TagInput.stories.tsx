import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import TagInput, { type TagInputProps } from './TagInput';

const meta = {
  component: TagInput,
} satisfies Meta<typeof TagInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  args: {
    label: 'Tags',
    value: [],
    options: [],
  },
  render: () => {
    const [{ onChange: sbOnChange, options, ...rest }, updateArgs] =
      useArgs<TagInputProps>();

    const onChange: TagInputProps['onChange'] = (event, newVal, reason, details) => {
      updateArgs({ value: newVal });
      sbOnChange?.(event, newVal, reason, details);
    };

    return <TagInput onChange={onChange} options={options} {...rest} />;
  },
};

export const Default: Story = {
  ...Template,
  args: {
    label: 'Tags',
    value: ['abc', 'def'],
    options: ['abc', 'def', 'ghi'],
  },
};
