import { ComponentType, lazy, LazyExoticComponent } from 'react';

export interface RouteItem<T extends ComponentType> {
  path: string;
  component: LazyExoticComponent<T>;
  permissions?: string[];
}

const routes: RouteItem<ComponentType>[] = [
  {
    path: '/',
    component: lazy(() => import('./diary/pages/ActivityListPage')),
  },
  {
    path: '/login',
    component: lazy(() => import('./common/pages/LoginPage')),
  },
  {
    path: '/forgot-pwd',
    component: lazy(() => import('./common/pages/ForgotPwdPage')),
  },
  {
    path: '/forgot-pwd/success',
    component: lazy(() => import('./common/pages/ForgotPwdSuccessPage')),
  },
  {
    path: '/reset-pwd',
    component: lazy(() => import('./common/pages/ResetPwdPage')),
  },
  {
    path: '/reset-pwd/success',
    component: lazy(() => import('./common/pages/ResetPwdSuccessPage')),
  },
  {
    path: '/profile',
    component: lazy(() => import('./common/pages/ProfilePage')),
  },
  {
    path: '/profile/change-pwd',
    component: lazy(() => import('./common/pages/ChangePwdPage')),
  },
  {
    path: '/activities/new',
    component: lazy(() => import('./diary/pages/AddActivityPage')),
  },
  {
    path: '/activities/edit/:id',
    component: lazy(() => import('./diary/pages/UpdateActivityPage')),
  },
];

export default routes;
