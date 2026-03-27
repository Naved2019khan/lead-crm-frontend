export const ROLES = {
  ADMIN:  'admin',
  SELLER: 'seller',
  BUYER:  'buyer',
  STAFF:  'staff',
  GUEST:  'guest',
};

export const PERMISSIONS = {
  admin:  ['*'],   // wildcard — everything
  seller: ['product:create', 'product:edit', 'product:delete', 'order:view'],
  buyer:  ['order:create', 'order:view', 'product:view'],
  staff:  ['order:view', 'order:update', 'product:view'],
  guest:  ['product:view'],
};
