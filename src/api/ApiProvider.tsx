import React from 'react';
import { ApiUtils } from './ApiUtils';
import { ApiContext } from './contexts';

interface ApiProviderProps {
  baseUrl: string;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ baseUrl, children }) => {
  const apiClient = new ApiUtils(baseUrl);
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};
