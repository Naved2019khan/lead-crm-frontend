'use client';
import { Provider } from 'react-redux';
import { store } from './index';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initAuth, syncUser, sessionExpired } from './slice/auth-slice';
import { AppDispatch } from './index';

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initialize authentication state on load
    dispatch(initAuth());

    // Listeners for token updates
    const handleRefresh = () => dispatch(syncUser());
    const handleLogout = () => dispatch(sessionExpired());

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:refresh', handleRefresh as EventListener);
      window.addEventListener('auth:logout', handleLogout as EventListener);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth:refresh', handleRefresh as EventListener);
        window.removeEventListener('auth:logout', handleLogout as EventListener);
      }
    };
  }, [dispatch]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap>
        {children}
      </AuthBootstrap>
    </Provider>
  );
}
