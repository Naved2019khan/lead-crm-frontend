// ============================================
// 10. TESTING API ENDPOINTS
// ============================================
/*
# Create new blog (Draft)
POST http://localhost:5000/api/blogs
Content-Type: application/json

{
  "title": "Getting Started with Next.js",
  "content": "Next.js is a powerful React framework...",
  "author": "John Doe",
  "category": "Technology",
  "status": "draft",
  "metaTitle": "Next.js Guide",
  "metaDescription": "Complete guide to Next.js",
  "keywords": "nextjs, react, web development"
}

# Get all blogs
GET http://localhost:5000/api/blogs

# Get blogs with filters
GET http://localhost:5000/api/blogs?status=published&category=Technology

# Get single blog
GET http://localhost:5000/api/blogs/:id
GET http://localhost:5000/api/blogs/getting-started-nextjs

# Update blog
PUT http://localhost:5000/api/blogs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}

# Publish blog
POST http://localhost:5000/api/blogs/:id/publish

# Save as draft
POST http://localhost:5000/api/blogs/:id/draft

# Delete blog
DELETE http://localhost:5000/api/blogs/:id

# Get statistics
GET http://localhost:5000/api/blogs/stats/overview
*/

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const blogAPI = {
  // Create new blog
  create: async (blogData) => {
    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    return response.json();
  },

  // Get all blogs
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/blogs?${params}`);
    return response.json();
  },

  // Get single blog
  getOne: async (identifier) => {
    const response = await fetch(`${API_URL}/blog/${identifier}`);
    return response.json();
  },

  // Update blog
  update: async (id, blogData) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    return response.json();
  },

  // Delete blog
  delete: async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Publish blog
  publish: async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}/publish`, {
      method: 'POST'
    });
    return response.json();
  },

  // Save as draft
  saveDraft: async (id) => {
    const response = await fetch(`${API_URL}/blogs/${id}/draft`, {
      method: 'POST'
    });
    return response.json();
  },

  // Get stats
  getStats: async () => {
    const response = await fetch(`${API_URL}/blogs/stats/overview`);
    return response.json();
  }
};
