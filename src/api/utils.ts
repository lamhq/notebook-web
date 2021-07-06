import { create as createDeferred } from 'typescript-deferred';
import { ApiClient } from './types';

// A deferred object created to access ApiUtils outside of Component
const deferred = createDeferred<ApiClient>();

export function getApiClient(): PromiseLike<ApiClient> {
  return deferred.promise;
}

export function setApiClient(val: ApiClient): void {
  deferred.resolve(val);
}
