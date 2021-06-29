import React from 'react';
import { ApiClient } from './types';

export const ApiContext = React.createContext<ApiClient | undefined>(undefined);
ApiContext.displayName = 'ApiContext';
