import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { TagItem, TagItemProps } from '.';

export default {
  title: 'Atoms/TagItem',
  component: TagItem,
} as Meta;

const Template: Story<TagItemProps> = (args) => {
  return <TagItem {...args} />;
};

export const Default = Template.bind({});
Default.args = { label: 'play' };
