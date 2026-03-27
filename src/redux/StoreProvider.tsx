'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';
import { initAuth, sessionExpired } from './slice/auth-slice';
import { tokenManager } from '@/lib/tokenManager';

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const bootRef = useRef(false);

  useEffect(() => {
    // Guard against React strict mode double-fire
    if (bootRef.current) return;
    bootRef.current = true;

    // Restore session from httpOnly cookie on every hard refresh
    store.dispatch(initAuth()).then((res) => {
      // If session successfully restored, start background rotation
      if (res.meta.requestStatus === "fulfilled") {
        tokenManager.startRotation();
      }
    });

    // Listen for forced logout from axios interceptor
    const handler = () => {
      tokenManager.stopRotation();
      store.dispatch(sessionExpired());
    };
    window.addEventListener('auth:logout', handler);
    
    return () => {
      tokenManager.stopRotation();
      window.removeEventListener('auth:logout', handler);
    };
  }, []);

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
