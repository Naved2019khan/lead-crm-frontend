'use client';
import { Provider } from 'react-redux';
import { store } from './index';

function AuthBootstrap({ children }: { children: React.ReactNode }) {

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
