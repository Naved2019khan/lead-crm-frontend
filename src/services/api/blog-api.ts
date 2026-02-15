import axiosClient from "../axiosClient";

export const blogAPI = {
  // Create new blog
  create: async (blogData) => {
    const { data } = await axiosClient.post("/blogs", blogData);
    return data;
  },

  // Get all blogs
  getAll: async (filters = {}) => {
    try {
      const { data } = await axiosClient.get("/blogs", {
        params: filters,
      });
      return data;

    } catch (error) {
      console.log(error);
    }
  },

  // Get single blog
  getOne: async (identifier: string) => {
    const { data } = await axiosClient.get(`/blog/${identifier}`);
    return data;
  },

  // Update blog
  update: async (id, blogData) => {

    const { data } = await axiosClient.put(`/blogs/${id}`, blogData);
    return data;
  },

  // Delete blog
  delete: async (id) => {

    const { data } = await axiosClient.delete(`/blogs/${id}`);
    return data;
  },

  // Publish blog
  publish: async (id) => {

    const { data } = await axiosClient.post(`/blogs/${id}/publish`);
    return data;
  },

  // Save as draft
  saveDraft: async (id) => {

    const { data } = await axiosClient.post(`/blogs/${id}/draft`);
    return data;
  },

  // Get stats
  getStats: async () => {

    const { data } = await axiosClient.get("/blogs/stats/overview");
    return data;
  },
};
