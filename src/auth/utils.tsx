import type { ComponentType } from 'react';
import { withAuthenticationRequired } from 'react-oidc-context';
import LoadingFallback from '../common/organism/LoadingFallback';

export function requireAuth(comp: ComponentType): ComponentType {
  return withAuthenticationRequired(comp, {
    OnRedirecting: LoadingFallback,
  });
}
