import React from 'react'

type Props = {}

const AddProductCard = ({title = '', subtitle  = '',onClick}) => {
  return (
    <button   onClick={onClick}
              className={`
                relative p-4 rounded-lg border border-dashed bg-gray-50 text-left transition-all duration-300 ease-in-out hover:shadow-md hover:bg-gray-200 hover:shadow-gray-300/70 hover:-translate-y-0.5
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {title}
                    </h3>
                  {subtitle && (
                    <p className="text-sm text-gray-500 mt-1">
                      {subtitle}
                    </p>
                  )}                
                </div>
              </div>
            </button>
  )
}

export default AddProductCard
