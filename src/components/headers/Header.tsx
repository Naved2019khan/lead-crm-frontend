"use client";

import { DOMAIN_NAME } from "@/lib/constants";
import { setOpenModal } from "@/redux/slice/auth-slice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const handleLogin = () => {dispatch(setOpenModal('signIn'))};
  const handleSignUp = () => {dispatch(setOpenModal('signUp'))};

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
        <div className="space-x-2">
         <button
            onClick={handleLogin}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
            >
            Login
          </button>
         <button
            onClick={handleSignUp}
            className="px-4 py-2 bg-gray-100 text-black rounded hover:bg-gray-200"
            >
            Sign Up
          </button>
            </div>
      </nav>
    </header>
  );
}
