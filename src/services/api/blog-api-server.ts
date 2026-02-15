import { axiosServer } from "@/utils/axiosInstance";

export const blogServerAPI = {
    getOne: async (identifier: string) => {
        const axiosInstance = await axiosServer();
        const { data } = await axiosInstance.get(`/blog/${identifier}`);
        return data;
    }
};
