// import axiosInstance from "axios"
import axiosInstance from "@/utils/axiosInstance";
const CRM_URL = process.env.NEXT_PUBLIC_BASE_URL
const CRM_ENDPOINT = {
    getAllLead : "/agency/get-all-agency-leads",
    getLeadById : "/agency/get-agency-lead",
    updateLead : "/agency/update-agency-lead"
}

export const getAllLeads = async () => {
    try {
        const response = await axiosInstance.get(CRM_ENDPOINT.getAllLead)
        return response.data
    } catch (error) {
        console.log(error.stack)
        throw error
    }
}


export const getLeadById = async (leadId: string) => {
    try {
        const response = await axiosInstance.get(`${CRM_URL}${CRM_ENDPOINT.getLeadById}/${leadId}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateLead = async (leadId: string, data: any) => {
    try {
        const response = await axiosInstance.put(`${CRM_URL}${CRM_ENDPOINT.updateLead}/${leadId}`, data);
        return response.data
    } catch (error) {
        throw error
    }
}