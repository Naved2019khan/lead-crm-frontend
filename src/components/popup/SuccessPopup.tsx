import React from 'react'
import { Modal } from '../ui/Modal';

const SuccessPopup = ({isOpen, onClose , heading = "heading" , description = "description" } : { isOpen : boolean , onClose : () => void , heading : string , description : string } ) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
    <div className="p-6">

        <h2 className="text-2xl font-bold text-green-600">{heading}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <button type="button" onClick={onClose} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Close</button>
    </div>
    </Modal>
  )
}

export default SuccessPopup