import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { LoadingContent } from '.';

export default {
  title: 'Atoms/LoadingContent',
  component: LoadingContent,
} as Meta;

// Variants
export const Default: React.FC = () => <LoadingContent />;
