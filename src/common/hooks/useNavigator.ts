import React from 'react';
import { useHistory } from 'react-router-dom';

interface NavigationHelpers {
  redirect: (link: string) => void;
  goBack: () => void;
  reload: () => void;
  getLinkProps: (url?: string) => { onClick: () => void };
}

export default function useNavigator(): NavigationHelpers {
  const h = useHistory();

  const redirect = React.useCallback(
    (link: string) => {
      // set a delay to prevent issue state update on an unmounted component
      setTimeout(() => h.push(link), 10);
    },
    [h],
  );

  const goBack = React.useCallback(() => {
    if (h.length > 0) {
      h.goBack();
      return;
    }
    h.push('/');
  }, [h]);

  const reload = React.useCallback(() => {
    h.go(0);
  }, [h]);

  const getLinkProps: NavigationHelpers['getLinkProps'] = (url) => ({
    // go to specified url or go back
    onClick: url ? () => redirect(url) : goBack,
  });

  return {
    redirect,
    goBack,
    reload,
    getLinkProps,
  };
}
