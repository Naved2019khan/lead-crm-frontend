"use client";
import React, { useEffect, useState } from "react";
import { Search, Plus, Edit, Eye, Trash2, Calendar, User, Tag, FileText, CheckCircle, Clock, XCircle, Globe, ChevronDown,
} from "lucide-react";

import { blogAPI } from "@/services/api/blog-api";
import Link from "next/link";
import useOutsideClick from "@/hooks/useOutsideClick";
import { productApi } from "@/services/api/product-api";
import { localStorage } from "@/lib/storage/localStorage";
import { STORAGE_KEYS } from "@/lib/storage/storageKeys";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropDownRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Filter blogs by selected site with null checks
  const siteBlogss =
    selectedSite && Array.isArray(blogs)
      ? blogs.filter((blog) => blog?.siteId === selectedSite.siteId)
      : [];

  const categories = [
    ...new Set(siteBlogss.map((blog) => blog?.category).filter(Boolean)),
  ];

  const filteredBlogs = siteBlogss.filter((blog) => {
    if (!blog) return false;

    const matchesSearch =
      (blog.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (blog.author?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || blog.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || blog.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-emerald-500 text-white",
      draft: "bg-slate-500 text-white",
      scheduled: "bg-blue-500 text-white",
    };
    const icons = {
      published: <CheckCircle size={14} />,
      draft: <FileText size={14} />,
      scheduled: <Clock size={14} />,
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || "bg-slate-500 text-white"
        }`}
      >
        {icons[status] || <FileText size={14} />}
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
      </span>
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        // Add your delete API call here if needed
        // await blogAPI.delete(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog post. Please try again.");
      }
    }
  };

  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setShowPreview(true);
  };

  const stats = {
    total: siteBlogss.length,
    published: siteBlogss.filter((b) => b?.status === "published").length,
    draft: siteBlogss.filter((b) => b?.status === "draft").length,
    scheduled: siteBlogss.filter((b) => b?.status === "scheduled").length,
  };

  const getSiteColorClass = (color = null, type = "bg", index) => {
    const colors = {
      0:
        type === "bg"
          ? "bg-blue-500"
          : type === "text"
          ? "text-blue-600"
          : "border-blue-500",
      1:
        type === "bg"
          ? "bg-purple-500"
          : type === "text"
          ? "text-purple-600"
          : "border-purple-500",
      2:
        type === "bg"
          ? "bg-emerald-500"
          : type === "text"
          ? "text-emerald-600"
          : "border-emerald-500",
      3:
        type === "bg"
          ? "bg-orange-500"
          : type === "text"
          ? "text-orange-600"
          : "border-orange-500",
    };
    return colors[index % 4] || colors[0];
  };

  const fetchBlogs = async () => {
    if (!selectedSite?.siteId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await blogAPI.getAll(selectedSite.siteId);

      if (response?.data && Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        setBlogs([]);
        console.warn("Unexpected API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again later.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteId = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getAllProducts();

      if (response?.combined && Array.isArray(response.combined)) {
        setSites(response.combined);
        if (response.combined.length > 0) {
          setSelectedSite(
            JSON.parse(localStorage.get(STORAGE_KEYS.BLOG_PREFERENCES)) ||
              response.combined[0]
          );
        }
      } else {
        setSites([]);

        setError("No sites available.");
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
      setError("Failed to load sites. Please try again later.");
      setSites([]);
    } finally {
      setLoading(false);
    }
  };

  useOutsideClick(dropDownRef, () => setShowSiteDropdown(false));

  useEffect(() => {
    if (!selectedSite) return;
    fetchBlogs();
  }, [selectedSite]);

  useEffect(() => {
    fetchSiteId();
  }, []);

  // Show loading state
  if (loading && !selectedSite) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !selectedSite) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border-2 border-red-100 max-w-md">
          <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
            <XCircle size={48} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => fetchSiteId()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Blog Management
              </h1>
              <p className="text-slate-600 text-lg">
                Manage and organize your blog posts
              </p>
            </div>
            <Link
              href={`/dashboard/blogs-editor/${selectedSite?.siteId || ""}`}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Create New Post
            </Link>
          </div>

          {/* Site Selector */}
          {sites.length > 0 && (
            <div className="mb-6 flex relative">
              <div ref={dropDownRef}>
                <button
                  onClick={() => setShowSiteDropdown(!showSiteDropdown)}
                  className={`flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border-2 ${getSiteColorClass(
                    null,
                    "border",
                    selectedSite?.siteId || 0
                  )} w-full md:w-auto`}
                >
                  <div
                    className={`p-2 ${getSiteColorClass(
                      null,
                      "bg",
                      selectedSite?.siteId || 0
                    )} bg-opacity-10 rounded-xl`}
                  >
                    <Globe className="text-white" size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-slate-500">
                      Current Site
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {selectedSite?.siteName || "No Site Selected"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedSite?.siteDomain || ""}
                    </p>
                  </div>
                  <ChevronDown size={20} className="text-slate-400" />
                </button>

                {showSiteDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-96 bg-white rounded-2xl shadow-xl border-2 border-slate-100 z-50 overflow-hidden">
                    {sites.map((site, idx) => (
                      <button
                        key={site?.siteId || idx}
                        onClick={() => {
                          setSelectedSite(site);
                          localStorage.set(
                            STORAGE_KEYS.BLOG_PREFERENCES,
                            JSON.stringify(site)
                          );
                          setShowSiteDropdown(false);
                          setFilterStatus("all");
                          setFilterCategory("all");
                          setSearchTerm("");
                        }}
                        className={`flex items-center gap-3 px-6 py-4 w-full hover:bg-slate-50 transition-all ${
                          selectedSite?.siteId === site?.siteId
                            ? "bg-slate-50"
                            : ""
                        }`}
                      >
                        <div
                          className={`p-2 ${getSiteColorClass(
                            site?.color,
                            "bg",
                            site?.siteId || idx
                          )} bg-opacity-10 rounded-xl`}
                        >
                          <Globe className="text-white" size={20} />
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-base font-bold text-slate-900">
                            {site?.siteName || "Unknown Site"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {site?.siteDomain || ""}
                          </p>
                        </div>
                        {selectedSite?.siteId === site?.siteId && (
                          <CheckCircle
                            className={getSiteColorClass(
                              site?.color,
                              "text",
                              site?.siteId || idx
                            )}
                            size={20}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Total Posts
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="text-blue-600" size={28} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Published
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.published}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CheckCircle className="text-emerald-600" size={28} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Drafts
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.draft}
                  </p>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl">
                  <FileText className="text-slate-600" size={28} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Scheduled
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.scheduled}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Clock className="text-amber-600" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
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
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat, idx) => (
                    <option key={cat || idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State for Blogs */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border-2 border-slate-100">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600 text-lg">Loading blogs...</p>
          </div>
        )}

        {/* Error State for Blogs */}
        {error && selectedSite && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border-2 border-red-100">
            <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
              <XCircle size={48} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Error Loading Blogs
            </h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => fetchBlogs()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Blog List */}
        {!loading && !error && (
          <div className="space-y-5">
            {filteredBlogs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border-2 border-slate-100">
                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                  <FileText size={48} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No blog posts found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredBlogs.map((blog, idx) => (
                <div
                  key={blog?.id || blog?._id || idx}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border-2 border-slate-100"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Featured Image */}
                    <div className="md:w-72 h-48 md:h-auto bg-slate-200 flex-shrink-0">
                      {blog?.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog?.title || "Blog image"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText size={48} className="text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold text-slate-900">
                              {blog?.title || "Untitled"}
                            </h2>
                            {getStatusBadge(blog?.status)}
                          </div>
                          <p className="text-slate-600 text-base mb-4 leading-relaxed">
                            {blog?.excerpt || "No excerpt available"}
                          </p>
                          <div className="flex flex-wrap gap-5 text-sm text-slate-500 font-medium">
                            {blog?.author && (
                              <span className="flex items-center gap-2">
                                <div className="p-1.5 bg-purple-100 rounded-lg">
                                  <User size={14} className="text-purple-600" />
                                </div>
                                {blog.author}
                              </span>
                            )}
                            {blog?.category && (
                              <span className="flex items-center gap-2">
                                <div className="p-1.5 bg-pink-100 rounded-lg">
                                  <Tag size={14} className="text-pink-600" />
                                </div>
                                {blog.category}
                              </span>
                            )}
                            {blog?.createdAt && (
                              <span className="flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-100 rounded-lg">
                                  <Calendar
                                    size={14}
                                    className="text-indigo-600"
                                  />
                                </div>
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            )}
                            <span className="flex items-center gap-2">
                              <div className="p-1.5 bg-teal-100 rounded-lg">
                                <Eye size={14} className="text-teal-600" />
                              </div>
                              {(blog?.views || 0).toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-5 pt-5 border-t-2 border-slate-100">
                        <button
                          onClick={() => handlePreview(blog)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-semibold"
                        >
                          <Eye size={16} />
                          Preview
                        </button>
                        <Link
                          href={`/dashboard/blogs-editor/${
                            selectedSite?.siteId || ""
                          }?id=${blog?._id || blog?.id || ""}`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all font-semibold"
                        >
                          <Edit size={16} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog?.id || blog?._id)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all ml-auto font-semibold"
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
        )}

        {/* Preview Modal */}
        {showPreview && selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b-2 border-slate-100 p-5 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-2xl font-bold text-slate-900">
                  Blog Preview
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <XCircle size={24} className="text-slate-600" />
                </button>
              </div>
              <div className="p-8">
                {selectedBlog?.featuredImage && (
                  <img
                    src={selectedBlog.featuredImage}
                    alt={selectedBlog?.title || "Blog image"}
                    className="w-full h-72 object-cover rounded-2xl mb-6"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl font-bold flex-1 text-slate-900">
                    {selectedBlog?.title || "Untitled"}
                  </h1>
                  {getStatusBadge(selectedBlog?.status)}
                </div>
                <div className="flex gap-5 text-sm text-slate-600 mb-6 pb-6 border-b-2 border-slate-100 font-medium">
                  {selectedBlog?.author && (
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-purple-600" />
                      {selectedBlog.author}
                    </span>
                  )}
                  {selectedBlog?.category && (
                    <span className="flex items-center gap-2">
                      <Tag size={16} className="text-pink-600" />
                      {selectedBlog.category}
                    </span>
                  )}
                  {selectedBlog?.createdAt && (
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-600" />
                      {new Date(selectedBlog.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="prose max-w-none">
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">
                    {selectedBlog?.excerpt || "No excerpt available"}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>
                {(selectedBlog?.metaDescription || selectedBlog?.slug) && (
                  <div className="mt-6 pt-6 border-t-2 border-slate-100 bg-slate-50 rounded-xl p-5">
                    <h4 className="font-bold text-slate-900 mb-3 text-lg">
                      SEO Information
                    </h4>
                    {selectedBlog?.metaDescription && (
                      <p className="text-sm text-slate-700 mb-2">
                        <strong className="text-slate-900">
                          Meta Description:
                        </strong>{" "}
                        {selectedBlog.metaDescription}
                      </p>
                    )}
                    {selectedBlog?.slug && (
                      <p className="text-sm text-slate-700">
                        <strong className="text-slate-900">URL:</strong> /blog/
                        {selectedBlog.slug}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Editor Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b-2 border-slate-100 p-5 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </h3>
                <button
                  onClick={() => {
                    setShowEditor(false);
                    setSelectedBlog(null);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <XCircle size={24} className="text-slate-600" />
                </button>
              </div>
              <div className="p-8">
                <p className="text-center text-slate-600 text-lg">
                  Editor component would be loaded here with blog data
                  pre-filled for editing.
                </p>
                {selectedBlog && (
                  <div className="mt-6 p-5 bg-blue-50 rounded-xl border-2 border-blue-100">
                    <p className="text-sm font-bold text-blue-900 mb-1">
                      Editing:
                    </p>
                    <p className="text-base text-blue-800 font-medium">
                      {selectedBlog?.title || "Untitled"}
                    </p>
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
