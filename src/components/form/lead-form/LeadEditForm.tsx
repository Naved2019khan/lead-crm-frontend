import { useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Save,
  ArrowLeft,
  Building2,
  Tag,
  MessageSquare
} from "lucide-react";
import { dateForPicker } from "@/lib/date";
import { updateLead } from "@/services/api/agency-api";
import SuccessCard from "@/components/card/SuccessCard";

interface Lead {
  _id?: string;
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
  notes: string | any[];
}

interface LeadEditFormProps {
  selectedLead: Lead;
  onClose: () => void;
  onEdit: (value: boolean) => void;
}

export const LeadEditForm = ({ selectedLead, onClose, onEdit }: LeadEditFormProps) => {
  const [form, setForm] = useState({
    fullName: selectedLead?.fullName || "",
    email: selectedLead?.email || "",
    phone: selectedLead?.phone || "",
    company: selectedLead?.company || "",
    location: selectedLead?.location || "",
    status: selectedLead?.status || "new",
    value: selectedLead?.value || "",
    notes: Array.isArray(selectedLead?.notes)
      ? selectedLead.notes.map((n: any) => n.body).join("\n")
      : typeof selectedLead?.notes === "string" ? selectedLead.notes : "",
    appointmentDate: selectedLead?.appointmentDate || "",
    source: selectedLead?.source || "",
  });
  const [responseMsg, setResponseMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getStatusColor = (status: Lead["status"]) => {
    const colors: Record<Lead["status"], string> = {
      new: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
      contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
      qualified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      lost: "bg-rose-50 text-rose-700 ring-rose-600/20",
    };
    return colors[status] || "bg-gray-50 text-gray-700 ring-gray-600/20";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const leadId = (selectedLead as any)._id || (selectedLead as any).id;
      if (!leadId) throw new Error("Lead ID is missing");

      const response = await updateLead(leadId, form);

      if (response.success || response) {
        setResponseMsg(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrorMsg("Failed to save changes. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to update lead:", error);
      setErrorMsg(error.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (responseMsg) return <SuccessCard isOpen={responseMsg} onContinue={onClose} />;

  return (
    <form
      onSubmit={handleSave}
      className="bg-white rounded-[2.5rem] overflow-hidden max-w-4xl w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] ring-1 ring-gray-200 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-500"
    >
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
                Parameter Modification <span className="text-gray-200">|</span> CRM v2.0
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Section - Reduced Overlap */}
        <div className="relative px-12 -mt-12 mb-8 flex items-end gap-8 z-50">
          <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl ring-1 ring-gray-100 flex-shrink-0 animate-in slide-in-from-bottom-6 duration-500">
            <div className="w-full h-full rounded-[1.25rem] bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-4xl font-black shadow-inner">
              {form.fullName
                ? form.fullName.split(" ").map((n: string) => n[0]).slice(0, 2).join("")
                : "?"}
            </div>
          </div>
          <div className="flex-1 mb-1 space-y-2">
            <div className="flex items-center gap-3 group/status">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                System Entity Status
              </span>
              <div className="h-4 w-px bg-gray-100"></div>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border-0 ring-1 ring-inset ${getStatusColor(form.status as Lead["status"])} outline-none cursor-pointer hover:bg-white transition-all`}
              >
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="qualified">qualified</option>
                <option value="lost">lost</option>
              </select>
            </div>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-none">
              Optimize Ecosystem
            </h3>
          </div>
        </div>
      </div>

      <div className="relative px-12 pb-12 flex-1 overflow-y-auto custom-scrollbar bg-white">
        {errorMsg && (
          <div className="mb-8 p-6 bg-rose-50 border border-rose-100 rounded-[2rem] text-rose-700 text-sm font-black flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="p-2 bg-rose-100 rounded-lg">
              <X className="w-5 h-5" />
            </div>
            {errorMsg}
          </div>
        )}

        {/* Form Sections */}
        <div className="space-y-12">
          {/* Section: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="space-y-8">
              <h4 className="text-[12px] font-black text-gray-300 uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                Primary Intelligence
              </h4>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                    <Tag className="h-5 w-5" />
                  </div>
                  <input
                    required
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="block w-full pl-14 pr-6 py-4 text-base bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:outline-none focus:ring-[6px] focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold placeholder:text-gray-200"
                    placeholder="e.g. Maverick Mitchell"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Corporate Entity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="block w-full pl-14 pr-6 py-4 text-base bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:outline-none focus:ring-[6px] focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold placeholder:text-gray-200"
                    placeholder="e.g. Aerospace Industries"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[12px] font-black text-gray-300 uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                Valuation Metrics
              </h4>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Projected Deal Value</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-emerald-500/50 group-focus-within:text-indigo-500 transition-colors font-black">
                    $
                  </div>
                  <input
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    className="block w-full pl-14 pr-6 py-4 text-base bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:outline-none focus:ring-[6px] focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-black text-emerald-600 placeholder:text-gray-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Lead Origin Channel</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-amber-500/50 group-focus-within:text-indigo-500 transition-colors">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <input
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    className="block w-full pl-14 pr-6 py-4 text-base bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:outline-none focus:ring-[6px] focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-bold placeholder:text-gray-200"
                    placeholder="e.g. LinkedIn Meta"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Logistics Panel */}
          <div className="bg-gray-50/30 p-10 rounded-[3rem] border border-gray-100 shadow-inner space-y-10">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] text-center">Infrastructural Nodes</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="group space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Electronic Interface</label>
                <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-sm">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    required
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="flex-1 text-base font-bold text-gray-900 outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Direct Communication</label>
                <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-sm">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="flex-1 text-base font-bold text-gray-900 outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Geographical Nexus</label>
                <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-sm">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="flex-1 text-base font-bold text-gray-900 outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Acquisition Milestone</label>
                <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl ring-1 ring-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-sm">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    name="appointmentDate"
                    type="date"
                    value={dateForPicker(form.appointmentDate)}
                    onChange={handleChange}
                    className="flex-1 text-base font-bold text-gray-900 outline-none bg-transparent cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Notes Assessment */}
          <div className="space-y-6 pb-6 pt-4">
            <h4 className="flex items-center gap-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.3em] px-1">
              <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              Strategic assessment & Narrative Update
            </h4>
            <div className="px-1 relative">
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full p-8 text-lg font-medium text-gray-800 bg-gray-50/50 border border-gray-100 rounded-[3rem] focus:outline-none focus:ring-[8px] focus:ring-indigo-500/5 focus:border-indigo-500 transition-all min-h-[180px] shadow-inner placeholder:text-gray-200 leading-relaxed"
                placeholder="Append strategic narrative updates or critical intelligence vectors..."
                rows={4}
              />
              <div className="absolute bottom-6 right-8 text-[9px] font-black text-gray-300 uppercase tracking-widest">
                Internal Audit Enabled
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern High-Contrast Footer */}
      <div className="flex items-center justify-between gap-6 p-10 bg-gray-50/80 border-t border-gray-100 backdrop-blur-xl flex-shrink-0 z-40">
        <button
          type="button"
          onClick={() => onEdit(false)}
          className="px-8 py-4 text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.3em] flex items-center gap-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Revert Status
        </button>
        <div className="flex gap-6">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 text-[11px] font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-[0.2em]"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center gap-4 px-14 py-5 text-[11px] font-black text-white bg-indigo-600 hover:bg-violet-700 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 uppercase tracking-[0.3em] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {isSubmitting ? (
              <span className="flex items-center gap-4">
                <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                Synchronizing...
              </span>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Commit Parameters
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
