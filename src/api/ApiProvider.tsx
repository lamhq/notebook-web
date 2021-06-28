import React from 'react';
import { ApiHelper } from './ApiHelper';
import { ApiContext } from './contexts';

interface ApiProviderProps {
  baseUrl: string;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ baseUrl, children }) => {
  const apiClient = new ApiHelper(baseUrl);
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};
