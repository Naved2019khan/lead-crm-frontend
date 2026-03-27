import { errorHandler } from "@/utils/errorHandler";
import axios from "axios";
import axiosClient from "../axiosClient";
const CRM_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CRM_ENDPOINT = {
  signIn: "/auth/login",
  signUp: "/signup",
  logout: "/auth/logout",
};

export const signInNetworkCall = async (payload) => {
  try {
    const response = await axiosClient.post(CRM_ENDPOINT.signIn, payload);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const logoutNetworkCall = async () => {
  try {
    const response = await axiosClient.post(CRM_ENDPOINT.logout);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const signUpNetworkCall = async ({payload}) => {
  try {
    const response = await axios.post(CRM_URL + CRM_ENDPOINT.signUp, payload);
      if (!response.ok) throw new Error('Sign Up failed');
    return response.data;
  } catch (error) {
    throw error;
  }
};
