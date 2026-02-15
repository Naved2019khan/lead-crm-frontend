import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Copy,
  Building2,
  Clock,
  MessageSquare,
  Edit2,
  Plus
} from "lucide-react";
import { useState } from "react";

interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "lost";
  value: string;
  source: string;
  appointmentDate: string;
  location: string;
  notes: Array<{ body: string; date: string }>;
}

interface LeadStaticFromProps {
  selectedLead: Lead;
  onClose: () => void;
  onEdit: () => void;
}

const LeadStaticFrom = ({ selectedLead, onClose, onEdit }: LeadStaticFromProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusStyle = (status: Lead["status"]) => {
    const styles: Record<Lead["status"], string> = {
      new: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
      contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
      qualified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      lost: "bg-rose-50 text-rose-700 ring-rose-600/20",
    };
    return styles[status] || "bg-gray-50 text-gray-700 ring-gray-600/20";
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden max-w-4xl w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] ring-1 ring-gray-200 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-500">
      {/* Refined Minimal Header */}
      <div className="relative flex-shrink-0 z-50">
        <div className="relative h-32 bg-gray-50 overflow-hidden border-b border-gray-100">
          {/* Subtle Accent Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white"></div>

          {/* Header Controls */}
          <div className="relative p-8 flex justify-between items-start z-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Building2 className="w-4 h-4" />
              </div>
              <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em]">
                Lead Portfolio <span className="text-gray-200">|</span> CRM v2.0
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Section - Reduced Overlap for better visibility */}
        <div className="relative px-12 -mt-12 mb-8 flex items-end gap-8 z-50">
          <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl ring-1 ring-gray-100 flex-shrink-0 animate-in slide-in-from-bottom-6 duration-500">
            <div className="w-full h-full rounded-[1.25rem] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-4xl font-black shadow-inner">
              {selectedLead.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
          </div>

          <div className="flex-1 pb-1 space-y-2">
            <div className="flex items-center gap-3 group/status">
              <span className={`inline-flex items-center rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] ring-1 ring-inset shadow-sm ${getStatusStyle(selectedLead.status)}`}>
                {selectedLead.status}
              </span>
              <div className="h-4 w-px bg-gray-100"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                Source: <span className="text-indigo-600">{selectedLead.source}</span>
              </p>
            </div>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-none">
              {selectedLead.fullName}
            </h3>
            <p className="text-base font-bold text-gray-400 flex items-center gap-2">
              {selectedLead.company || "Independent Entity"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="relative px-12 pb-12 flex-1 overflow-y-auto custom-scrollbar bg-white">
        {/* Action & Info Grid */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          {/* Contact Details Panel */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em] px-1">Engagement Core</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group p-5 rounded-3xl bg-gray-50/50 hover:bg-indigo-50/50 border border-gray-100/50 hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-gray-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedLead.email, 'email')}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {copied === 'email' ? <span className="text-[10px] font-black text-indigo-600">COPIED</span> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Electronic Mail</p>
                <p className="text-base font-bold text-gray-900 truncate tracking-tight">{selectedLead.email}</p>
              </div>

              <div className="group p-5 rounded-3xl bg-gray-50/50 hover:bg-indigo-50/50 border border-gray-100/50 hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-gray-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedLead.phone, 'phone')}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {copied === 'phone' ? <span className="text-[10px] font-black text-indigo-600">COPIED</span> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Direct Interface</p>
                <p className="text-base font-bold text-gray-900 tracking-tight">{selectedLead.phone}</p>
              </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-indigo-50/30 border border-indigo-100/50 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100 text-indigo-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Physical Nexus</p>
                  <p className="text-lg font-bold text-gray-900">{selectedLead.location}</p>
                </div>
              </div>
              <div className="h-12 w-px bg-indigo-200/50 mx-6 hidden sm:block"></div>
              <div className="flex-1 text-right sm:text-left">
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Asset Evaluation</p>
                <p className="text-2xl font-black text-emerald-600 tracking-tight">{selectedLead.value}</p>
              </div>
            </div>
          </div>

          {/* Temporal Metrics Panel */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em] px-1">Registry Log</h4>
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Clock className="w-32 h-32" />
              </div>
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                    <Calendar className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Acquisition Timestamp</p>
                    <p className="text-xl font-bold tracking-tight">{selectedLead.appointmentDate}</p>
                  </div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                    <Clock className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Last Interaction</p>
                    <p className="text-xl font-bold tracking-tight">Active Relationship</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Area */}
        <div className="space-y-8 border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between px-2">
            <div>
              <h5 className="flex items-center gap-2 text-[13px] font-black text-gray-900 uppercase tracking-[0.2em]">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Strategic Intel
              </h5>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Chronological discourse history</p>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center gap-3 px-6 py-2.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-gray-200"
            >
              Append Entry <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {Array.isArray(selectedLead?.notes) && selectedLead.notes.length > 0 ? selectedLead.notes.slice().reverse().map((note, index) => (
              <div key={index} className="group relative flex gap-8">
                <div className="flex flex-col items-center flex-shrink-0 pt-2">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-indigo-600 group-hover:scale-110 transition-transform z-10" />
                  <div className="w-0.5 flex-1 bg-gray-100 my-2 group-last:hidden" />
                </div>
                <div className="flex-1 pb-10 group-last:pb-0 font-medium">
                  <div className="p-8 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 group-hover:bg-white group-hover:border-indigo-100 group-hover:shadow-2xl group-hover:shadow-indigo-500/5 transition-all duration-500">
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {note.body}
                    </p>
                    <div className="flex items-center gap-3 mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <div className="p-1.5 rounded-lg bg-gray-100 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span>{new Date(note.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-gray-200">/</span>
                      <span className="text-indigo-400">{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-16 rounded-[3rem] bg-gray-50/50 border-2 border-dashed border-gray-100 text-center flex flex-col items-center gap-4">
                <div className="p-6 bg-white rounded-[2rem] text-gray-200 shadow-sm ring-1 ring-gray-100">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em] font-mono italic">Void Status: No History Logged</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern High-Contrast Footer */}
      <div className="flex items-center justify-between gap-6 p-10 bg-gray-50/80 border-t border-gray-100 backdrop-blur-xl flex-shrink-0 z-40">
        <button
          onClick={onClose}
          className="px-8 py-4 text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.3em] flex items-center gap-3"
        >
          <X className="w-4 h-4" />
          Dismiss
        </button>
        <button
          onClick={onEdit}
          className="group flex items-center gap-4 px-12 py-5 text-[11px] font-black text-white bg-indigo-600 hover:bg-violet-700 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Edit2 className="w-4 h-4" />
          Modify Parameters
        </button>
      </div>
    </div>


  );
};

export default LeadStaticFrom;
