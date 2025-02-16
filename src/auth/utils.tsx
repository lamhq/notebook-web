import type { ComponentType } from 'react';
import { withAuthenticationRequired } from 'react-oidc-context';
import LoadingFallback from '../common/organism/LoadingFallback';
import { REDIRECT_ROUTE } from './constants';

export function requireAuth(comp: ComponentType): ComponentType {
  return withAuthenticationRequired(comp, {
    OnRedirecting: LoadingFallback,
    onBeforeSignin: () => {
      window.localStorage.setItem(REDIRECT_ROUTE, window.location.pathname);
    },
  });
}
