"use client"

import { Button } from "@/components/button/Button"
import { getAllCapture } from "@/services/api/captue-api"
import { useEffect, useState } from "react"

const Page = () => {
    const [allCapture, setAllCapture] = useState([])
    const [status, setStatus] = useState('loading')
    const [isExpanded, setIsExpanded] = useState(null)

    function toggleExpanded(id) {
        if (isExpanded === id) {
            setIsExpanded(null)
        } else {
            setIsExpanded(id)
        }
    }

    useEffect(() => {
        const fetchCapture = async () => {
            const response = await getAllCapture()
            setAllCapture(response.data)
            setStatus('success')
        }
        fetchCapture()
    }, [])

    if (status === 'loading') {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Capture Lead</h1>
            {
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
            }



        </div>
    )
}

export default Page