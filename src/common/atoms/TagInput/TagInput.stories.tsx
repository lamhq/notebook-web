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
    const [{ onChange: sbOnChange, options, ...rest }, updateArgs] = useArgs();

    const onChange: TagInputProps['onChange'] = (_, newVal) => {
      updateArgs({ value: newVal });
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
