import React from 'react';
import { Route, RouteProps, Redirect, useLocation } from 'react-router-dom';
import { useIdentity } from '../../hooks';

export interface ProtectedRouteProps extends RouteProps {
  loginUrl?: string;
  permissions?: string[];
}

const ProtectedRoute: React.VFC<ProtectedRouteProps> = ({
  path,
  component,
  loginUrl = '/login',
  permissions = [],
}) => {
  const identity = useIdentity();
  const location = useLocation();
  const dst = {
    pathname: loginUrl,
    state: { from: location },
  };
  return identity || permissions.length === 0 ? (
    <Route path={path} component={component} exact />
  ) : (
    <Redirect to={dst} />
  );
};

export default ProtectedRoute;
