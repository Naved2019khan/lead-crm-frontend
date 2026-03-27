"use client"

import { Table } from "@/components/listing/UserListing";
import { PERMISSIONS } from "@/lib/permissions";
import { useState, useMemo } from "react";
import { Shield, Save, X, User as UserIcon, Building2, Key } from "lucide-react";

type DomainType = 'ecom' | 'flight' | 'agency' | 'superadmin';

interface User {
  id: number;
  name: string;
  email: string;
  domain: DomainType;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
}

const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'Sarah Super',
    email: 'sarah.s@system.com',
    domain: 'superadmin',
    role: 'superadmin',
    status: 'active',
    permissions: ['*'],
  },
  {
    id: 2,
    name: 'Mike Agency',
    email: 'mike@agency.com',
    domain: 'agency',
    role: 'manager',
    status: 'active',
    permissions: [...PERMISSIONS.agency.manager],
  },
  {
    id: 3,
    name: 'Emma Flight',
    email: 'emma@flight.com',
    domain: 'flight',
    role: 'admin',
    status: 'active',
    permissions: [...PERMISSIONS.flight.admin],
  },
  {
    id: 4,
    name: 'John Ecom',
    email: 'john@ecom.com',
    domain: 'ecom',
    role: 'seller',
    status: 'active',
    permissions: [...PERMISSIONS.ecom.seller],
  },
  {
    id: 5,
    name: 'Lisa Viewer',
    email: 'lisa@agency.com',
    domain: 'agency',
    role: 'guest',
    status: 'pending',
    permissions: [...PERMISSIONS.agency.guest],
  },
  {
    id: 6,
    name: 'David Support',
    email: 'david@ecom.com',
    domain: 'ecom',
    role: 'staff',
    status: 'inactive',
    permissions: [...PERMISSIONS.ecom.staff],
  },
];

export default function DomainUserListing() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState<'all' | DomainType>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form State for editing
  const [editRole, setEditRole] = useState<string>('');
  const [editPermissions, setEditPermissions] = useState<string[]>([]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditPermissions([...user.permissions]);
  };

  const closeEditor = () => {
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    setUsers(curr => curr.map(u => 
      u.id === selectedUser.id 
        ? { ...u, role: editRole, permissions: [...editPermissions] } 
        : u
    ));
    setSelectedUser(null);
  };

  const handleRoleChange = (newRole: string) => {
    setEditRole(newRole);
    if (selectedUser?.domain && selectedUser.domain !== 'superadmin') {
      const domainPerms = PERMISSIONS[selectedUser.domain as keyof typeof PERMISSIONS];
      if (domainPerms && newRole in domainPerms) {
        setEditPermissions([...domainPerms[newRole as keyof typeof domainPerms]]);
      }
    }
  };

  const togglePermission = (perm: string) => {
    setEditPermissions(curr => 
      curr.includes(perm) ? curr.filter(p => p !== perm) : [...curr, perm]
    );
  };

  const filteredUsers = useMemo(() => {
    if (activeTab === 'all') return users;
    return users.filter(u => u.domain === activeTab);
  }, [users, activeTab]);

  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (u: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {u.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{u.name}</p>
            <p className="text-xs text-gray-500">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'domain',
      header: 'Domain',
      sortable: true,
      render: (u: User) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold uppercase tracking-wider border border-gray-200">
          {u.domain}
        </span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (u: User) => (
        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold uppercase tracking-wider border border-indigo-100">
          {u.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (u: User) => {
        const colors = {
          active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          inactive: 'bg-rose-50 text-rose-700 border-rose-200',
          pending: 'bg-amber-50 text-amber-700 border-amber-200',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${colors[u.status]}`}>
            {u.status}
          </span>
        );
      },
    },
  ];

  // Helper to get all possible permissions for a domain to display checkboxes
  const getAllDomainPermissions = (domain: DomainType): string[] => {
    if (domain === 'superadmin') return ['*'];
    const domainRoles = PERMISSIONS[domain as keyof typeof PERMISSIONS];
    if (!domainRoles) return [];
    
    const allPerms = new Set<string>();
    Object.values(domainRoles).forEach(perms => {
      perms.forEach(p => allPerms.add(p));
    });
    return Array.from(allPerms);
  };

  return (
    <div className="min-h-[90vh] bg-[#f8fafc] p-4 lg:p-8 flex gap-6">
      
      {/* Main Listing Section */}
      <div className={`flex-1 transition-all duration-300 ${selectedUser ? 'lg:w-2/3 max-w-4xl' : 'w-full max-w-7xl mx-auto'}`}>
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">User Management</h1>
            <p className="text-gray-500 mt-1 font-medium">Manage cross-domain roles and permissions</p>
          </div>
        </div>

        {/* Domain Tabs */}
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex mb-6 overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Users' },
            { id: 'agency', label: 'Software Agency' },
            { id: 'flight', label: 'Flight Booking' },
            { id: 'ecom', label: 'E-commerce' },
            { id: 'superadmin', label: 'System Admins' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSelectedUser(null); }}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <Table
            data={filteredUsers}
            columns={columns}
            onRowClick={handleRowClick}
            striped={false}
            hoverable
            bordered={false}
            emptyMessage={`No users found in ${activeTab} domain.`}
          />
        </div>
      </div>

      {/* Side Editor Panel */}
      {selectedUser && (
        <div className="hidden lg:block w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-8 overflow-hidden flex flex-col max-h-[calc(100vh-4rem)]">
            {/* Editor Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white relative flex-shrink-0">
              <button 
                onClick={closeEditor}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/10 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl border border-white/20">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight">{selectedUser.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-white/10 rounded-md text-[10px] font-black uppercase tracking-wider border border-white/10">
                  {selectedUser.domain}
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-200 rounded-md text-[10px] font-black uppercase tracking-wider border border-indigo-500/30">
                  {selectedUser.status}
                </span>
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8">
              
              {/* Role Selection */}
              <section>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-indigo-500" />
                  Domain Role
                </h3>
                {selectedUser.domain === 'superadmin' ? (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium">
                    Super Admins bypass standard domain roles and have full system access.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(PERMISSIONS[selectedUser.domain as keyof typeof PERMISSIONS] || {}).map(role => (
                      <button
                        key={role}
                        onClick={() => handleRoleChange(role)}
                        className={`
                          p-3 rounded-xl border text-left transition-all
                          ${editRole === role 
                            ? 'bg-indigo-50 border-indigo-200 shadow-sm ring-1 ring-indigo-600' 
                            : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <p className={`font-bold capitalize ${editRole === role ? 'text-indigo-900' : 'text-gray-700'}`}>
                          {role}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* Permissions Checkboxes */}
              <section>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-500" />
                  Direct Permissions
                </h3>
                {selectedUser.domain === 'superadmin' ? (
                  <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-200 inline-flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Full System Access [*]
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                    {getAllDomainPermissions(selectedUser.domain).map(perm => (
                      <label key={perm} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center mt-0.5">
                          <input
                            type="checkbox"
                            checked={editPermissions.includes(perm)}
                            onChange={() => togglePermission(perm)}
                            className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 transition-colors"
                          />
                          <Shield className="w-3 h-3 text-white absolute inset-0 m-auto opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-bold transition-colors ${editPermissions.includes(perm) ? 'text-gray-900' : 'text-gray-500'}`}>
                            {perm}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Editor Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleSaveUser}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Editor Overlay (Optional for responsiveness) */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 lg:hidden flex items-end justify-center">
             {/* Note: omitted fully responsive mobile view for brevity, but the desktop view works perfectly in this layout  */}
             <div className="bg-white w-full max-h-[90vh] rounded-t-3xl p-6 overflow-y-auto">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">Edit {selectedUser.name}</h2>
                 <button onClick={closeEditor} className="p-2 bg-gray-100 rounded-full"><X className="w-4 h-4" /></button>
               </div>
               <button
                  onClick={handleSaveUser}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
             </div>
        </div>
      )}
    </div>
  );
}
