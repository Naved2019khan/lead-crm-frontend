"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const user = useSelector((state: any) => state.authSlice?.user);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">
          You don't have permission to view this page. If you believe this is a mistake, please contact your administrator.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm text-left border border-gray-100">
          <p className="text-gray-500 mb-1">Current User:</p>
          <p className="font-semibold text-gray-900">{user?.name || "Unknown"}</p>
          <p className="text-gray-500 mt-2 mb-1">Status:</p>
          <p className="font-semibold text-gray-900">
            {user?.isSuperAdmin ? "Super Admin" : "Standard User"}
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
