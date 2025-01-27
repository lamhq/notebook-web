import { atom } from 'jotai';
import type { AlertItem } from './types';

const initializeState: AlertItem[] = [];

export const alertAtom = atom(initializeState);
