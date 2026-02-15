"use client";
import { Eye, Search, Filter, MoreHorizontal, Download, Plus } from "lucide-react";
import { useEffect, useState, useMemo } from 'react';
import { Modal } from "../ui/Modal";
import LeadAction from "../form/lead-form/LeadActionForm";
import { updateSiteAction } from "@/app/actions/updateSiteAction";

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
  notes: string | any[];
}

const LeadListing = ({ leads }: { leads: Lead[] }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleCloseModal = () => {
    updateSiteAction();
    setSelectedLead(null);
  };

  const getStatusColor = (status: Lead["status"]) => {
    const colors = {
      new: "bg-indigo-50 text-indigo-700 border-indigo-100",
      contacted: "bg-amber-50 text-amber-700 border-amber-100",
      qualified: "bg-emerald-50 text-emerald-700 border-emerald-100",
      lost: "bg-rose-50 text-rose-700 border-rose-100",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-100";
  };

  const filteredLeads = useMemo(() => {
    return leads?.filter((lead) => {
      const name = lead.fullName || "";
      const email = lead.email || "";
      const company = lead.company || "";

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    }) || [];
  }, [leads, searchTerm, statusFilter]);

  const handleSelectLead = (lead: Lead) => {
    console.log("Selecting lead:", lead);
    setSelectedLead(lead);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leads Ecosystem</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Capture, track, and optimize your conversion pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Export feature coming soon!")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => alert("Add Lead wizard coming soon!")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by name, email or company..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50/50 px-3 py-2 rounded-xl border border-gray-100">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="text-xs font-bold text-gray-600 bg-transparent border-none focus:ring-0 outline-none cursor-pointer uppercase tracking-wider"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Categories: All</option>
              <option value="new">New Leads</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Lead Identity
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Value
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Origin
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id || (lead as any)._id} className="hover:bg-indigo-50/30 transition-all group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20 ring-2 ring-white group-hover:scale-110 transition-transform">
                          {lead.fullName
                            ? lead.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")
                            : "?"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {lead.fullName}
                          </div>
                          <div className="text-[11px] font-medium text-gray-400">{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-700">
                        {lead.company || <span className="text-gray-300 italic font-normal text-xs">Unspecified</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider border ring-1 ring-inset rounded-lg ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-indigo-600">
                        {lead.value}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
                        {lead.source}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-400">
                      {lead.appointmentDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleSelectLead(lead)}
                        className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-sm rounded-xl transition-all active:scale-90"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-gray-50 rounded-full">
                        <Search className="w-12 h-12 text-gray-200" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900">No leads match your criteria</p>
                        <p className="text-sm text-gray-500 mt-1">Try broadening your search or resetting the filters</p>
                      </div>
                      <button
                        onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {selectedLead && (
        <Modal
          isOpen={selectedLead !== null}
          onClose={handleCloseModal}
          title="" // Managing title inside LeadAction for more control
        >
          <LeadAction selectedLead={selectedLead} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default LeadListing;

