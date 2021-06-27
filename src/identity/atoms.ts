import { atom } from 'recoil';
import { Identity } from './types';

export const identityState = atom<Identity | undefined>({
  key: 'identityState', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});
