import { CaptureLeadWrapper } from "@/components/listing/Wrapper"
import { Heading } from "@/components/ui/Heading"
import { Suspense } from "react"

const Page = () => {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] ring-1 ring-indigo-100">
                            System Interface
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                        Inbound Neural <span className="text-indigo-600">Capture</span>
                    </h1>
                    <p className="text-sm font-bold text-gray-400 tracking-tight">
                        Surfacing raw fragment signatures from external lead source vectors.
                    </p>
                </div>
            </div>

            <div className="relative">
                <Suspense fallback={
                    <div className="p-12 flex flex-col items-center justify-center gap-4 text-gray-400">
                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-black uppercase tracking-widest">Hydrating Neural fragments...</span>
                    </div>
                }>
                    <CaptureLeadWrapper />
                </Suspense>
            </div>
        </div>
    );
}

export default Page
