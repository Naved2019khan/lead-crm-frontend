import axios from "axios";
const CRM_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CRM_ENDPOINT = {
  signIn: "/api/login",
  signUp: "/api/signup",
};

export const signInNetworkCall = async ({payload}) => {
  try {
    const response = await axios.post(CRM_URL + CRM_ENDPOINT.signIn, payload);
    return response.data;
  } catch (error) {
    throw error;
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
