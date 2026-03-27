"use client";

import { useRole } from "@/hooks/useRole";
import { PERMISSIONS, ROUTE_PERMISSIONS } from "@/lib/permissions";
import { ShieldCheck, User } from "lucide-react";

export default function RoleTesterPage() {
  const { user, isSuperAdmin } = useRole();

  if (!user) {
    return <div className="p-8">Loading user data...</div>;
  }

  // Helper to determine if a route is accessible
  const checkRoute = (route: string) => {
    const perm = ROUTE_PERMISSIONS[route];
    if (!perm) return true; // Default accessible
    if (perm.superAdminOnly && !isSuperAdmin) return false;
    return true;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          Role & Permission Tester
        </h1>
        <p className="text-gray-500 mt-2">
          View your current session data, active roles, and resulting permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Info */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" /> Session Identity
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Name</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <p className="font-semibold text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Super Admin</p>
              <span className={`px-2 py-1 rounded text-xs font-bold ${isSuperAdmin ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                {isSuperAdmin ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </section>

        {/* Assigned Business Roles */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Assigned Business Roles</h2>
          {(!user.roles || user.roles.length === 0) ? (
            <p className="text-gray-500 italic">No business roles assigned.</p>
          ) : (
            <div className="space-y-4">
              {user.roles.map((r: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase">{r.businessType}</span>
                    <p className="font-bold text-gray-900 capitalize text-lg">{r.role}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${r.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {r.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Route Access */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Navigation / Route Access</h2>
          <div className="space-y-2">
            {Object.entries(ROUTE_PERMISSIONS).map(([path, config]) => {
              const accessible = checkRoute(path);
              return (
                <div key={path} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-semibold text-gray-900">{config.label}</p>
                    <p className="text-xs text-gray-400 font-mono">{path}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${accessible ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {accessible ? 'ALLOWED' : 'BLOCKED'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Matrix */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Action Permission Matrix</h2>
          <div className="space-y-6">
            {['ecom', 'flight', 'agency'].map(biz => {
              const bizRole = user.roles?.find((r: any) => r.businessType === biz && r.isActive)?.role;
              const perms = isSuperAdmin ? ['* (All)'] : (bizRole ? PERMISSIONS[biz]?.[bizRole] || [] : ['None']);
              
              return (
                <div key={biz} className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-900 capitalize">{biz} System</span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {bizRole || (isSuperAdmin ? 'Super Admin Override' : 'No Role')}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {perms.map((p, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded border border-gray-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
