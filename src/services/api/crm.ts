import { serverFetch } from "@/utils/serverFetch";
const CRM_ENDPOINT = {
    getAllLead : "/agency/get-all-agency-leads",
    getLeadById : "/agency/get-agency-lead",
    updateLead : "/agency/update-agency-lead"
}

export const getAllLeads = async () => {
    return await serverFetch(CRM_ENDPOINT.getAllLead);
}


export const getLeadById = async (leadId: string) => {
    return await serverFetch(`${CRM_ENDPOINT.getLeadById}/${leadId}`);
}

export const updateLead = async (leadId: string, data: any) => {
    return await serverFetch(`${CRM_ENDPOINT.updateLead}/${leadId}`, { method: "PUT", data });
}