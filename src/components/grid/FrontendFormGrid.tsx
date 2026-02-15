import { Link } from 'lucide-react'
import React from 'react'


const FrontendFormGrid = ({name , link }) => {
  return (
     <Link href={`/dashboard/all-agency-sites`}
      className={`relative p-4 rounded-lg border text-left transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-gray-300/70 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
          </h3>
          <div className="flex gap-2 mt-2">
          </div>
        </div>
      </div>
      </Link>
  )
}

export default FrontendFormGrid
