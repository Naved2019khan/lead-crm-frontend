import { axiosServer } from "@/utils/axiosInstance";
const CRM_ENDPOINT = {
    getAllLead : "/agency/get-all-agency-leads",
    getLeadById : "/agency/get-agency-lead",
    updateLead : "/agency/update-agency-lead"
}

export const getAllLeads = async () => {
    try {
        const axiosInstance = await axiosServer();
        const response = await axiosInstance.get(CRM_ENDPOINT.getAllLead)
        return response.data
    } catch (error) {
        throw error
    }
}


export const getLeadById = async (leadId: string) => {
    try {
        const axiosInstance = await axiosServer();
        const response = await axiosInstance.get(`${CRM_ENDPOINT.getLeadById}/${leadId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateLead = async (leadId: string, data: any) => {
    try {
         const axiosInstance = await axiosServer();
        const response = await axiosInstance.put(`${CRM_ENDPOINT.updateLead}/${leadId}`, data);
        return response.data
    } catch (error) {
        throw error
    }
}