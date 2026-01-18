
import { axiosServer } from "@/utils/axiosInstance";
import axiosClient from "../axiosClient";





/**
 * Retrieves all agency sites from the server.
 * @returns {Promise<object>} The response data from the server.
 * @throws {Error} If there is an error making the request.
 */
export const getAgencySites = async () => {
  try {
     const axiosInstance = await axiosServer();
    const response = await axiosInstance.post("/product/get-all-agency",{});
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getFlightSites = async () => {
  try {
     const axiosInstance = await axiosServer();
    const response = await axiosInstance.post(
      "/product/get-all-flight-site"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
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