"use client"
import { useState } from 'react'
import { Button } from '../button/Button'


const CaptureLead = ({ allCapture }) => {
    const [isExpanded, setIsExpanded] = useState(null)
    function toggleExpanded(id) {
        if (isExpanded === id) {
            setIsExpanded(null)
        } else {
            setIsExpanded(id)
        }
    }

    return (
        <div> {
            allCapture.map((capture) => (
                <div className="px-12" key={capture._id}  >
                    <div className={`overflow-y-auto relative  p-4  ${isExpanded === capture._id ? 'bg-gray-200 h-48 ' : 'h-full bg-blue-100'}`}>
                        <Button className="absolute right-8 top-2" onClick={() => toggleExpanded(capture._id)}>Open {capture._id.slice(9)}</Button>
                        <code >
                            <pre>
                                {JSON.stringify(capture, null, 2)}
                            </pre>
                        </code>
                    </div>
                </div>
            ))
        }</div>
    )
}

export default CaptureLead