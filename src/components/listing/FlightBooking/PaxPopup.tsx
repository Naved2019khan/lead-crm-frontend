
import { Modal } from '@/components/ui/Modal';
import React from 'react'

type PaxPopupType = {
  isOpen: boolean;
  onClose: () => void;
  paxDetail : any;
}

export const PaxPopup = ({ isOpen , onClose , paxDetail }: PaxPopupType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>

    <div className={`bg-white  p-4 rounded-md shadow-md`}>
        <div>
            <h1 className="text-2xl font-bold">Passenger Details</h1>
        <pre>
         <code>
            {JSON.stringify(paxDetail, null, 2)}
         </code>
         </pre>
        </div>
    </div>
    </Modal>
  )
}
