import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useIdentity } from './hooks';

interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}

export default function withAuth<T>(loginUrl = '/login'): HOC<T> {
  const hoc: HOC<T> = (Component) => {
    const WithAuth: React.ComponentType<T> = (props) => {
      const identity = useIdentity();
      const location = useLocation();
      const dst = {
        pathname: loginUrl,
        state: { from: location },
      };
      return identity ? <Component {...props} /> : <Redirect to={dst} />;
    };

    WithAuth.displayName = 'WithAuth';
    return WithAuth;
  };
  return hoc;
}
