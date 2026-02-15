"use client"
import { Table } from "@/components/listing/UserListing";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  department: string;
}

export default function Page() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Admin',
      status: 'active',
      joinDate: '2023-01-15',
      department: 'Engineering',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'Developer',
      status: 'active',
      joinDate: '2023-03-22',
      department: 'Engineering',
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@company.com',
      role: 'Designer',
      status: 'active',
      joinDate: '2023-02-10',
      department: 'Design',
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.w@company.com',
      role: 'Manager',
      status: 'inactive',
      joinDate: '2022-11-05',
      department: 'Operations',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@company.com',
      role: 'Developer',
      status: 'pending',
      joinDate: '2024-01-08',
      department: 'Engineering',
    },
    {
      id: 6,
      name: 'David Martinez',
      email: 'david.m@company.com',
      role: 'Analyst',
      status: 'active',
      joinDate: '2023-06-18',
      department: 'Finance',
    },
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (user) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            {user.name.charAt(0)}
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
          {user.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => {
        const colors = {
          active: 'bg-green-100 text-green-700',
          inactive: 'bg-gray-100 text-gray-700',
          pending: 'bg-yellow-100 text-yellow-700',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[user.status]}`}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      sortable: true,
      render: (user) => new Date(user.joinDate).toLocaleDateString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Directory</h1>
          <p className="text-gray-600">Manage and view all users in your organization</p>
        </div>

        <Table
          data={users}
          columns={columns}
          onRowClick={setSelectedUser}
          striped
          hoverable
          bordered
          emptyMessage="No users found"
        />

        {selectedUser && (
          <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Selected User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Department:</span>
                <p className="font-medium">{selectedUser.department}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Role:</span>
                <p className="font-medium">{selectedUser.role}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <p className="font-medium capitalize">{selectedUser.status}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Join Date:</span>
                <p className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
