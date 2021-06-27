import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { identityState } from './atoms';
import { Identity } from './types';

export function useIdentity(): Identity | undefined {
  return useRecoilValue(identityState);
}

export function useSetIdentity(): SetterOrUpdater<Identity | undefined> {
  return useSetRecoilState(identityState);
}
