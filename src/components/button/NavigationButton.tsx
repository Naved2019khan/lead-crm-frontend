"use client"
import React from 'react'
import  Link  from 'next/link';

type Props = {
  label: string;
  backLink : string;
}

export const NavigationButton = ({ label, backLink = "/" }: Props) => {
  return (
    <div className="bg-white rounded-full flex w-fit py-2 px-3 items-center gap-2 mb-4">
        <Link href={backLink} className="flex items-center gap-2">
            <div className="text-xl font-extrabold bg-green-600 size-[50px] flex items-center justify-center hover:bg-green-700 text-white py-2 rounded-full transition">
                 ←
            </div>
            <h1 className="text-lg font-bold">{label}</h1>
        </Link>
    </div>
  )
}
