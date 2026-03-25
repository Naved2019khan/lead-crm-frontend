
import { serverFetch } from "@/utils/serverFetch";
import axiosClient from "../axiosClient";





/**
 * Retrieves all agency sites from the server.
 * @returns {Promise<object>} The response data from the server.
 * @throws {Error} If there is an error making the request.
 */
export const getAgencySites = async () => {
  return await serverFetch("/product/get-all-agency", { method: "POST", data: {} });
};



export const getFlightSites = async () => {
  return await serverFetch("/product/get-all-flight-site", { method: "POST" });
};



export const productApi = {
  getAllProducts: async () => {
    try {
      const response = await axiosClient.get("/product/get-all-product");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};