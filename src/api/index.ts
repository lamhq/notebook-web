// fix re-exported type issue
// https://github.com/babel/babel-loader/issues/603#issuecomment-399293448
import { ApiErrorHandler as InnerApiErrorHandler } from './types';

export type ApiErrorHandler = InnerApiErrorHandler;
export { ApiProvider, FakeApiProvider } from './ApiProvider';
export { useApi, useApiErrorHandler } from './hooks';
export { ApiErrorCode } from './types';
export { getApiClient } from './utils';
