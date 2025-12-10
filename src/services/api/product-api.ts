import axiosInstance from "@/utils/axiosInstance";

export const createAgencySites = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/product/create-agency-site",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAgencySites = async () => {
  try {
    const response = await axiosInstance.post("/api/product/get-all-agency",{});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAgencySites = async ( data,oldSiteId) => {
  try {
    const response = await axiosInstance.post(
      `/api/product/update-agency/${oldSiteId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFlightSites = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/product/create-flight-site",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFlightSites = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/product/get-all-flight-site"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFlightSites = async (siteId: number, data) => {
  try {
    const response = await axiosInstance.post(
      `/api/product/update-flight-site/${siteId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const productApi = {
  // createAgencySites,
  // getAgencySites,
  // updateAgencySites,
  // createFlightSites,
  // getFlightSites,
  // updateFlightSites,
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get("/product/get-all-product");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};