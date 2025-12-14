import axiosInstance from "@/utils/axiosInstance";
const CRM_ENDPOINT = {
    createLead : "/agency/create-agency-lead",
    getALLLead : "/agency/get-all-agency-leads",
    getLeadById : "/agency/get-agency-lead/",
    updateLead : "/agency/update-agency-lead"
}

export const createNewLead = async (data) => {
  try {
    const response = await axiosInstance.post(CRM_ENDPOINT.createLead,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getALLLead = async () => {
  try {
    const response = await axiosInstance.get(CRM_ENDPOINT.getALLLead);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLeadById = async (siteId: string) => {
  try {
    const response = await axiosInstance.get(CRM_ENDPOINT.getLeadById+ "/" + siteId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLead = async (id: string, data) => {
  try {
    const response = await axiosInstance.put(`${CRM_ENDPOINT.updateLead}/${id}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};