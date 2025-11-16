"use client";

import { DOMAIN_NAME } from "@/libs/constants";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          {DOMAIN_NAME}
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
         
        </div>
         <Link
            href="/login"
            className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
      </nav>
    </header>
  );
}
