// hooks/useRole.ts
import {  useSelector } from 'react-redux';
import { PERMISSIONS } from '@/lib/permissions';

type Business = 'ecom' | 'flight' | 'agency';

export function useRole(businessType?: Business) {
  const user = useSelector(state => state?.authSlice?.user);


  const bizRole = businessType
    ? user?.roles.find(r => r.businessType === businessType && r.isActive)
    : undefined;

  const role = bizRole?.role ?? null;
  const meta = bizRole?.meta ?? {};

  const hasRole = (...roles: string[]) => {
    if (user?.isSuperAdmin) return true;
    return roles.includes(role ?? '');
  };

  const can = (action: string) => {
    if (user?.isSuperAdmin) return true;
    if (!businessType || !role) return false;
    const perms = PERMISSIONS[businessType]?.[role] ?? [];
    return perms.includes('*') || perms.includes(action);
  };

  return {
    user,
    role, meta, hasRole, can,
    isSuperAdmin: user?.isSuperAdmin ?? false,
    isSeller: hasRole('seller'),
    isBuyer:  hasRole('buyer'),
    isStaff:  hasRole('staff'),
    isAdmin:  hasRole('admin'),
  };
}