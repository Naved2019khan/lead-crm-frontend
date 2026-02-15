
"use client"
import { useState } from 'react'
import { Code2, ChevronDown, ChevronUp, Copy, Terminal, History, Database } from 'lucide-react'
import { toast } from 'sonner'

const CaptureLead = ({ allCapture }: { allCapture: any[] }) => {
    const [isExpanded, setIsExpanded] = useState<string | null>(null)

    function toggleExpanded(id: string) {
        setIsExpanded(isExpanded === id ? null : id)
    }

    const copyToClipboard = (data: any) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
        toast.success("JSON signature copied to terminal buffer")
    }

    return (
        <div className="space-y-6 pb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                    <Database className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Raw Capture Fragments</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inbound Neural Data Stream</p>
                </div>
            </div>

            {allCapture?.map((capture: any) => (
                <div
                    key={capture._id}
                    className={`group transition-all duration-500 rounded-[2rem] border overflow-hidden ${isExpanded === capture._id
                        ? 'border-indigo-200 bg-white shadow-2xl scale-[1.01]'
                        : 'border-gray-100 bg-white/50 hover:bg-white shadow-sm hover:shadow-xl'
                        }`}
                >
                    {/* Header/Trigger */}
                    <div
                        onClick={() => toggleExpanded(capture._id)}
                        className="p-6 cursor-pointer flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl transition-all duration-500 ${isExpanded === capture._id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-indigo-500'}`}>
                                <Terminal className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-gray-900 tracking-tight">
                                        Fragment: <span className="text-indigo-600">#{capture._id.slice(-8).toUpperCase()}</span>
                                    </span>
                                    <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        VCR-NODE
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                                    <span className="flex items-center gap-1.5 uppercase tracking-widest">
                                        <History className="w-3 h-3" />
                                        {new Date(capture.createdAt || Date.now()).toLocaleTimeString()}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span className="uppercase tracking-widest">{capture.type || 'Generic Capture'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(capture)
                                }}
                                className="p-2.5 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                title="Copy JSON Data"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <div className={`p-2.5 rounded-xl transition-all ${isExpanded === capture._id ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'text-gray-300'}`}>
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* JSON Body */}
                    <div
                        className={`transition-all duration-500 ease-in-out ${isExpanded === capture._id
                            ? 'max-h-[1000px] opacity-100'
                            : 'max-h-0 opacity-0 overflow-hidden'
                            }`}
                    >
                        <div className="px-6 pb-6 pt-0">
                            <div className="relative rounded-3xl bg-[#0d1117] p-8 overflow-hidden group/code ring-1 ring-inset ring-white/10 shadow-inner">
                                {/* Decor orbs */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />

                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Signature Node v.2.0</span>
                                </div>

                                <code className="block text-[13px] font-mono leading-relaxed overflow-x-auto whitespace-pre custom-scrollbar scrollbar-thin scrollbar-thumb-white/10">
                                    <div className="flex flex-col gap-0.5">
                                        {JSON.stringify(capture, null, 2).split('\n').map((line, i) => (
                                            <div key={i} className="group/line flex gap-6 hover:bg-white/5 transition-colors">
                                                <span className="w-6 text-right select-none text-white/10 group-hover/line:text-white/30">{i + 1}</span>
                                                <span className="text-indigo-300/90 whitespace-pre">{line}</span>
                                            </div>
                                        ))}
                                    </div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CaptureLead
