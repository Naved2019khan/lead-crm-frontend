import { serverFetch } from "@/utils/serverFetch";

const CAPTURE_ENDPOINT = {
    get_capture_leaa : "/_next/all-capture-lead",
}

export const getAllCapture = async () => {
  return await serverFetch(CAPTURE_ENDPOINT.get_capture_leaa);
};