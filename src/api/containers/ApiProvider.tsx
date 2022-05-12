import React from 'react';
import ApiUtils, { fakeApiUtils } from '../ApiUtils';
import ApiContext from '../contexts/ApiContext';

interface ApiProviderProps {
  baseUrl: string;
}

const ApiProvider: React.FC<ApiProviderProps> = ({ baseUrl, children }) => {
  const apiClient = new ApiUtils(baseUrl);
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};

export default ApiProvider;

export const FakeApiProvider: React.FC = ({ children }) => {
  const apiClient = fakeApiUtils;
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};
