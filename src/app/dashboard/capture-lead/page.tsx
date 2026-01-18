import { CaptureLeadWrapper } from "@/components/listing/Wrapper"
import { Heading } from "@/components/ui/Heading"
import { Suspense } from "react"

const Page = () => {


    return (
        <div className="w-[90%] mx-auto">
            <Heading subtitle="other lead from ">Capture Lead</Heading>
            <Suspense fallback={<div>Loading...</div>}>
                <CaptureLeadWrapper />
            </Suspense>

        </div>
    )
}

export default Page