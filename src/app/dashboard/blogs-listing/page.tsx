"use client"
import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Trash2, Filter, Calendar, User, Tag, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function BlogListingPage() {
  // Sample blog data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      author: 'John Doe',
      category: 'Technology',
      status: 'published',
      views: 1234,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-05',
      featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      excerpt: 'Learn how to build modern web applications with Next.js 14 and its powerful features.',
      metaDescription: 'Complete guide to Next.js 14 with examples and best practices.'
    },
    {
      id: 2,
      title: 'Understanding React Server Components',
      slug: 'react-server-components',
      author: 'Jane Smith',
      category: 'Technology',
      status: 'draft',
      views: 0,
      createdAt: '2024-12-07',
      updatedAt: '2024-12-08',
      featuredImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400',
      excerpt: 'Deep dive into React Server Components and how they revolutionize data fetching.',
      metaDescription: 'Learn about React Server Components architecture and implementation.'
    },
    {
      id: 3,
      title: '10 Best Practices for SEO in 2024',
      slug: 'seo-best-practices-2024',
      author: 'Mike Johnson',
      category: 'Business',
      status: 'published',
      views: 2567,
      createdAt: '2024-11-28',
      updatedAt: '2024-11-30',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      excerpt: 'Discover the top SEO strategies that will boost your rankings this year.',
      metaDescription: 'Essential SEO best practices and techniques for 2024.'
    },
    {
      id: 4,
      title: 'Building Scalable APIs with Node.js',
      slug: 'scalable-apis-nodejs',
      author: 'Sarah Williams',
      category: 'Technology',
      status: 'scheduled',
      views: 0,
      createdAt: '2024-12-08',
      updatedAt: '2024-12-08',
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      excerpt: 'Master the art of creating high-performance REST APIs with Node.js.',
      metaDescription: 'Guide to building scalable and maintainable APIs using Node.js.'
    },
    {
      id: 5,
      title: 'CSS Grid vs Flexbox: When to Use What',
      slug: 'css-grid-vs-flexbox',
      author: 'John Doe',
      category: 'Technology',
      status: 'published',
      views: 890,
      createdAt: '2024-11-25',
      updatedAt: '2024-11-26',
      featuredImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
      excerpt: 'Learn the differences between CSS Grid and Flexbox and when to use each.',
      metaDescription: 'Comprehensive comparison of CSS Grid and Flexbox with examples.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Get unique categories
  const categories = [...new Set(blogs.map(blog => blog.category))];

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Status badge styles
  const getStatusBadge = (status) => {
    const styles = {
      published: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-gray-100 text-gray-700 border-gray-200',
      scheduled: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    const icons = {
      published: <CheckCircle size={14} />,
      draft: <FileText size={14} />,
      scheduled: <Clock size={14} />
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  // Handle preview
  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setShowPreview(true);
  };

  // Handle edit
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowEditor(true);
  };

  // Stats
  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    draft: blogs.filter(b => b.status === 'draft').length,
    scheduled: blogs.filter(b => b.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600 mt-1">Manage and organize your blog posts</p>
            </div>
            <button
              onClick={() => setShowEditor(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              <Plus size={20} />
              Create New Post
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <FileText className="text-blue-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                </div>
                <CheckCircle className="text-green-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                </div>
                <FileText className="text-gray-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
                </div>
                <Clock className="text-blue-500" size={32} />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-4">
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Featured Image */}
                  <div className="md:w-64 h-48 md:h-auto bg-gray-200">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
                          {getStatusBadge(blog.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag size={14} />
                            {blog.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {blog.views.toLocaleString()} views
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handlePreview(blog)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                      >
                        <Eye size={16} />
                        Preview
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition ml-auto"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">Blog Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="p-6">
                <img
                  src={selectedBlog.featuredImage}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-3xl font-bold flex-1">{selectedBlog.title}</h1>
                  {getStatusBadge(selectedBlog.status)}
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {selectedBlog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={14} />
                    {selectedBlog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(selectedBlog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">{selectedBlog.excerpt}</p>
                  <p className="text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">SEO Information:</h4>
                  <p className="text-sm text-gray-600"><strong>Meta Description:</strong> {selectedBlog.metaDescription}</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>URL:</strong> /blog/{selectedBlog.slug}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editor Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <button
                  onClick={() => {
                    setShowEditor(false);
                    setSelectedBlog(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-center text-gray-600">
                  Editor component would be loaded here with blog data pre-filled for editing.
                </p>
                {selectedBlog && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold">Editing:</p>
                    <p className="text-sm text-gray-700">{selectedBlog.title}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}