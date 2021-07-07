import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  loginUrl?: string;
  permissions?: string[];
}

const ProtectedRoute: React.VFC<ProtectedRouteProps> = ({
  path,
  component,
  // loginUrl = '/login',
  // permissions = [],
  // location,
}) => {
  return <Route path={path} component={component} exact />;
};

export default ProtectedRoute;
