import { atom, MutableSnapshot } from 'recoil';
import { Identity } from './types';

export const identityState = atom<Identity | undefined>({
  key: 'identityState', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const initializeState = ({ set }: MutableSnapshot): void => {
  set(identityState, {
    displayName: 'Admin',
    token: '',
    expireAt: new Date(),
    email: '',
    roles: [],
  });
};
