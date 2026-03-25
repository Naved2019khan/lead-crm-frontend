import { serverFetch } from "@/utils/serverFetch";

export const blogServerAPI = {
    getOne: async (identifier: string) => {
        return await serverFetch(`/blog/${identifier}`);
    }
};
