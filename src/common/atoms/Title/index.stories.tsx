import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Title, TitleProps } from '.';

export default {
  title: 'Atoms/Title',
  component: Title,
} as Meta;

const Template: Story<TitleProps & { text: string }> = (args) => {
  const { level, text } = args;
  return <Title level={level}>{text}</Title>;
};

export const H1 = Template.bind({});
H1.args = { level: 'h1', text: 'Title' };

export const H2 = Template.bind({});
H2.args = { level: 'h2', text: 'Title' };

export const H3 = Template.bind({});
H3.args = { level: 'h3', text: 'Title' };
