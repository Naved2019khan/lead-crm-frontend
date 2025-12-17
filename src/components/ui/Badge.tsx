import React from 'react'


export const Badge = ({text ,className} : {text : string , className? : string}) => {
  return (
    <span className={`rounded ${className} px-1 leading-4 font-semibold text-xs bg-red-500  text-white`}>{text}</span>
  )
}