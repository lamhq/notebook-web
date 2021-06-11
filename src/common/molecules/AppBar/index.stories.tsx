import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { AppBar } from '.';

export default {
  title: 'Molecules/AppBar',
  component: AppBar,
} as Meta;

export const Default: React.VFC = () => <AppBar />;
