"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EcomLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { user, isSuperAdmin, role } = useRole('ecom');
    const router = useRouter();

    useEffect(() => {
        // If the user state is loaded and they are not authorized, redirect
        if (user && !isSuperAdmin && !role) {
            router.push('/dashboard'); // or wherever appropriate
        }
    }, [user, isSuperAdmin, role, router]);

    // Show nothing while initializing or if unauthorized
    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!isSuperAdmin && !role) {
        return null; // The useEffect will handle the redirect
    }

    return (
        <div className="">
            {children}
        </div>
    );
};

export default EcomLayout;
