"use client"
import { Bell, Menu, Moon, Search, Sun, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Dropdown } from '../ui/Dropdown';
import { SearchableDropdown } from '../ui/DropdownInput';
import ProfileDropdown from '../dropdown/ProfileDropdown';

export default function DashboardHeader() {

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className='ml-auto flex items-center'>

          <ProfileDropdown />

          <button className=" text-gray-500 hover:text-gray-700 ">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}