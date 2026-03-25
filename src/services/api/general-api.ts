
import { serverFetch } from "@/utils/serverFetch";
import { errorHandler } from "@/utils/errorHandler";
const GENERAL_ENDPOINT = {
    getAllEmailSubscribe : "/general/get-all-email-subscribe",
 
}


export const getAllEmailSubscribe = async () => {
  return await serverFetch(GENERAL_ENDPOINT.getAllEmailSubscribe);
};


