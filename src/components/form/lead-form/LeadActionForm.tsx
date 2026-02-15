"use client";

import { useState } from "react";
import { LeadEditForm } from "./LeadEditForm";
import LeadStaticFrom from "./LeadStaticFrom";

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
  notes: any;
}

interface LeadActionProps {
  selectedLead: Lead;
  onClose: () => void;
}

export const LeadAction = ({ selectedLead, onClose }: LeadActionProps) => {
  const [mode, setMode] = useState<"view" | "edit">("view");

  if (mode === "edit") {
    return (
      <LeadEditForm
        selectedLead={selectedLead}
        onEdit={(val) => !val && setMode("view")}
        onClose={onClose}
      />
    );
  }

  return (
    <LeadStaticFrom
      selectedLead={selectedLead as any}
      onEdit={() => setMode("edit")}
      onClose={onClose}
    />
  );
};

export default LeadAction;

