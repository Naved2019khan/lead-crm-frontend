export const ROLES = {
  ADMIN:  'admin',
  SELLER: 'seller',
  BUYER:  'buyer',
  STAFF:  'staff',
  GUEST:  'guest',
};

/** Action-based permissions per business type */
export const PERMISSIONS: Record<string, Record<string, string[]>> = {
  ecom: {
    admin:  ['*'],
    seller: ['product:create', 'product:edit', 'product:delete', 'order:view'],
    buyer:  ['order:create', 'order:view', 'product:view'],
    staff:  ['order:view', 'order:update', 'product:view'],
    guest:  ['product:view'],
  },
  flight: {
    admin:  ['*'],
    staff:  ['booking:view', 'booking:update', 'lead:view'],
    agent:  ['booking:create', 'booking:view', 'lead:create', 'lead:view'],
    guest:  ['booking:view'],
  },
  agency: {
    admin:  ['*'],
    manager: ['lead:view', 'lead:update', 'site:view'],
    agent:  ['lead:create', 'lead:view'],
    guest:  ['lead:view'],
  },
};

/**
 * Nav-level route authorization.
 * Routes NOT listed here are accessible to all authenticated users.
 * `superAdminOnly: true` = only users with isSuperAdmin can access.
 */
export const ROUTE_PERMISSIONS: Record<string, { superAdminOnly?: boolean; label: string }> = {
  '/dashboard/user-listing':    { superAdminOnly: true,  label: 'Users' },
  '/dashboard/settings':        { superAdminOnly: true,  label: 'Settings' },
  '/dashboard/email-subscribe': { superAdminOnly: true,  label: 'Mailing List' },
};
