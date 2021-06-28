import React from 'react';
import { ApiContext } from './contexts';
import { ApiClient } from './types';

export function useApi(): ApiClient {
  const contextVal = React.useContext(ApiContext);
  if (!contextVal) {
    throw new Error('This component must be used inside a <ApiProvider> component.');
  }
  return contextVal;
}
