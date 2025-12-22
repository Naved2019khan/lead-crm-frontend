"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { Toolbar } from "@/components/ui/Toolbar";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  Mail,
  MoreVertical,
  Phone,
  Plane,
  XCircle,
} from "lucide-react";
import { convertLeadToTicket } from "@/services/api/booking-api";
import { useRouter } from "next/navigation";
import { getAllFlights } from "@/services/api/flight-api";

const statusConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  contacted: {
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  qualified: {
    label: "Qualified",
    color: "bg-purple-100 text-purple-700",
    icon: CheckCircle2,
  },
  converted: {
    label: "Converted",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  lost: { label: "Lost", color: "bg-red-100 text-red-700", icon: XCircle },
};

const FlightLeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const handleSearch = (term) => {
    const filtered = leads.filter(
      (lead) =>
        lead.fullName.toLowerCase().includes(term.toLowerCase()) ||
        lead.email.toLowerCase().includes(term.toLowerCase()) ||
        lead.phone.includes(term)
    );
    setFilteredLeads(
      statusFilter === "all"
        ? filtered
        : filtered.filter((l) => l.status === statusFilter)
    );
  };

  const fetchLeads = async () => {
    const response = await getAllFlights();
    setLeads(response?.data);
    setFilteredLeads(response?.data);
  };

  React.useEffect(() => {
    setFilteredLeads(
      statusFilter === "all"
        ? leads
        : leads.filter((l) => l.status === statusFilter)
    );
  }, [statusFilter, leads]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleRowAction = async (action, lead) => {
    // console.log(`Action: ${action}`, lead);
    // Add your action handlers here
    switch (action) {
      case "convert":
        await convertLeadToTicket(lead);
        fetchLeads()
        break;
      case "edit":
        // Edit lead

        break;
      case "delete":
        // Delete lead
        break;
    }
  };

  const columns = [
    {
      key: "fullName",
      header: "Customer",
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">
            {row.fullName} {row.isNew && <Badge text="New" />}
          </div>
          <div className="text-gray-500 flex items-center gap-1 mt-1">
            <Mail className="w-3 h-3" />
            {row.email}
          </div>
          <div className="text-gray-500 flex items-center gap-1 mt-1">
            <Phone className="w-3 h-3" />
            {row.phone}
          </div>
        </div>
      ),
    },
    {
      key: "flight",
      header: "Flight Details",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2 font-medium text-gray-900">
            <span>{row.departure}</span>
            <Plane className="w-4 h-4 text-gray-400" />
            <span>{row.arrival}</span>
          </div>
          <div className="text-gray-500 flex items-center gap-1 mt-1">
            <Calendar className="w-3 h-3" />
            {new Date(row.flightDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      ),
    },
    {
      key: "source",
      header: "Source",
      render: (row) => (
        <div>
          <div className="text-gray-900">{row.source}</div>
          <div className="text-xs text-gray-500">{row.campaign}</div>
        </div>
      ),
    },
    {
      key: "value",
      header: "Value",
      render: (row) => (
        <div className="font-semibold text-gray-900">
          ₹{row.value.toLocaleString("en-IN")}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const config = statusConfig[row.status];
        const StatusIcon = config.icon;
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xs text-xs font-medium ${config.color}`}
          >
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </span>
        );
      },
    },
    {
      key: "message",
      header: "Message",
      render: (row) => (
        <div className="max-w-xs truncate text-gray-600" title={row.message}>
          {row.message}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row, idx, { openDropdown, setOpenDropdown, onRowAction }) => (
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>

          {openDropdown === idx && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpenDropdown(null)}
              />
              <div className="absolute right-0 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20 max-h-96 overflow-y-auto">
                <button
                  onClick={() => {
                    onRowAction("view", row);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    onRowAction("edit", row);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <Edit className="w-4 h-4" />
                  Edit Lead
                </button>
                <button
                  onClick={() => {
                    onRowAction("email", row);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
                <button
                  onClick={() => {
                    onRowAction("convert", row);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Convert Lead
                </button>

                <div className="border-t border-gray-200 my-1"></div>

                <button
                  onClick={() => {
                    onRowAction("status-converted", row);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Mark as Converted
                </button>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar
        onSearch={handleSearch}
        onFilter={() => {}}
        onExport={() => {}}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredLeads.length}</span>{" "}
            of <span className="font-medium">{leads.length}</span> leads
          </p>
        </div>

        <DataTable
          data={filteredLeads}
          columns={columns}
          onRowAction={handleRowAction}
        />
      </div>
    </div>
  );
};

export default FlightLeadsTable;
