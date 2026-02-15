"use client";
import React, { useEffect, useState } from "react";
import {
  Search, Plus, Edit, Eye, Trash2, Calendar, User, Tag, FileText, CheckCircle, Clock, XCircle, Globe, ChevronDown, Database, Filter,
} from "lucide-react";

import Link from "next/link";
import { blogAPI } from "@/services/api/blog-api";
import useOutsideClick from "@/hooks/useOutsideClick";
import { productApi } from "@/services/api/product-api";
import { localStorage } from "@/lib/storage/localStorage";
import { STORAGE_KEYS } from "@/lib/storage/storageKeys";

export const dynamic = "force-dynamic";
export const cache = "no-store";

const DEFAULT_BLOG_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropDownRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Filter blogs by selected site with null checks
  const siteBlogs = Array.isArray(blogs)
    ? (selectedSite?.siteId === ""
      ? blogs
      : blogs.filter((blog: any) => blog?.siteId === selectedSite?.siteId))
    : [];

  const filteredBlogs = siteBlogs.filter((blog: any) => {
    if (!blog) return false;

    const matchesSearch =
      (blog.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (blog.author?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || blog.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: any = {
      published: {
        label: "Broadcast Live",
        dot: "bg-emerald-500",
        bg: "bg-emerald-500/10",
        text: "border-emerald-200/50 text-emerald-600",
        glass: "backdrop-blur-md bg-white/80"
      },
      draft: {
        label: "Local Draft",
        dot: "bg-amber-500",
        bg: "bg-amber-500/10",
        text: "border-amber-200/50 text-amber-600",
        glass: "backdrop-blur-md bg-white/80"
      },
      scheduled: {
        label: "System Queue",
        dot: "bg-indigo-500",
        bg: "bg-indigo-500/10",
        text: "border-indigo-200/50 text-indigo-600",
        glass: "backdrop-blur-md bg-white/80"
      }
    };

    const s = config[status] || config.draft;

    return (
      <div className={`${s.glass} ${s.text} border px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-sm`}>
        <div className="relative flex items-center justify-center">
          <div className={`absolute w-2 h-2 rounded-full animate-ping opacity-40 ${s.dot}`} />
          <div className={`relative w-1.5 h-1.5 rounded-full ${s.dot}`} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.12em] whitespace-nowrap">
          {s.label}
        </span>
      </div>
    );
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogAPI.delete(id);
        setBlogs(blogs.filter((blog) => (blog.id || blog._id) !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog post.");
      }
    }
  };

  const handlePreview = (blog: any) => {
    setSelectedBlog(blog);
    setShowPreview(true);
  };

  const stats = {
    total: siteBlogs.length,
    published: siteBlogs.filter((b) => b?.status === "published").length,
    draft: siteBlogs.filter((b) => b?.status === "draft").length,
  };

  const fetchBlogs = async (siteId = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogAPI.getAll({ siteId });

      if (response?.data && Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        setBlogs([]);
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error);
      setError("Failed to synchronize with blog repository.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteId = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getAllProducts();

      const globalSite = {
        siteId: "",
        siteName: "All Ecosystem Sites",
        siteDomain: "Global Repository",
        isGlobal: true
      };

      if (response?.combined && Array.isArray(response.combined)) {
        const allSites = [globalSite, ...response.combined];
        setSites(allSites);

        const savedPref = localStorage.get(STORAGE_KEYS.BLOG_PREFERENCES);
        setSelectedSite(savedPref ? JSON.parse(savedPref) : globalSite);
      } else {
        setSites([globalSite]);
        setSelectedSite(globalSite);
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
      setError("Failed to index available site vectors.");
    } finally {
      // fetchBlogs will be triggered by useEffect
    }
  };

  useOutsideClick(dropDownRef, () => setShowSiteDropdown(false));

  useEffect(() => {
    if (selectedSite !== null) {
      fetchBlogs(selectedSite.siteId);
    }
  }, [selectedSite]);

  useEffect(() => {
    fetchSiteId();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] ring-1 ring-indigo-100">
              Ecosystem Content
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
            Blog <span className="text-indigo-600">Intelligence</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 tracking-tight">
            Centralized repository for cross-platform editorial fragments.
          </p>
        </div>
        <Link
          href={`/dashboard/blogs-editor/${selectedSite?.siteId || ""}`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Site Selector Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Environment</span>
            </div>

            <div className="relative" ref={dropDownRef}>
              <button
                onClick={() => setShowSiteDropdown(!showSiteDropdown)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${selectedSite?.isGlobal ? "bg-indigo-600 shadow-indigo-100" : "bg-violet-600 shadow-violet-100"
                    }`}>
                    {selectedSite?.isGlobal ? <Globe className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-900 truncate max-w-[120px]">
                      {selectedSite?.siteName || "Select Interface"}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 truncate max-w-[120px]">
                      {selectedSite?.siteDomain || "Network Node"}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSiteDropdown ? "rotate-180" : ""}`} />
              </button>

              {showSiteDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {sites.map((site, idx) => (
                      <button
                        key={site?.siteId || idx}
                        onClick={() => {
                          setSelectedSite(site);
                          localStorage.set(STORAGE_KEYS.BLOG_PREFERENCES, JSON.stringify(site));
                          setShowSiteDropdown(false);
                          setFilterStatus("all");
                          setSearchTerm("");
                        }}
                        className={`flex items-center gap-3 p-3 w-full hover:bg-indigo-50/50 rounded-2xl transition-all mb-1 ${selectedSite?.siteId === site?.siteId ? "bg-indigo-50 text-indigo-600" : "text-gray-500"
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${site?.isGlobal ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
                          }`}>
                          {site?.isGlobal ? <Globe className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-[11px] font-black truncate">{site?.siteName}</p>
                          <p className="text-[9px] font-bold opacity-60 truncate">{site?.siteDomain}</p>
                        </div>
                        {selectedSite?.siteId === site?.siteId && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Content Metrics</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Total Posts', value: stats.total, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Published', value: stats.published, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Drafts', value: stats.draft, icon: Edit, color: 'text-amber-600', bg: 'bg-amber-50' }
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100/50">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className={`p-2 rounded-xl scale-75 ${stat.bg} ${stat.color}`}>
                      <stat.icon size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight">{stat.label}</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Filtering Vectors</span>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stream..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-bold focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-bold focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none appearance-none"
              >
                <option value="all">All Status Modes</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          {loading ? (
            <div className="p-24 flex flex-col items-center justify-center gap-4 text-gray-400 bg-white rounded-[3rem] border border-gray-100 shadow-sm min-h-[400px]">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Synchronizing Repository...</span>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-24 flex flex-col items-center justify-center gap-4 text-gray-400 bg-white rounded-[3rem] border border-gray-100 shadow-sm min-h-[400px]">
              <div className="p-6 bg-gray-50 rounded-full">
                <FileText className="w-12 h-12 opacity-20" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-gray-900 mb-1">No editorials found</p>
                <p className="text-[11px] font-bold">Try adjusting your environment or search terms.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogs.map((blog: any, idx) => (
                <div
                  key={blog?._id || blog?.id || idx}
                  className="group relative bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden flex flex-col md:flex-row p-4 gap-6"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-56 h-48 md:h-auto rounded-[2rem] bg-gray-100 overflow-hidden flex-shrink-0 relative">
                    <img
                      src={blog?.featuredImage || DEFAULT_BLOG_IMAGE}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e: any) => {
                        e.target.src = DEFAULT_BLOG_IMAGE;
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(blog?.status)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedSite?.isGlobal && blog?.siteId && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-200">
                              Source: {sites.find(s => s.siteId === blog.siteId)?.siteName || 'Unknown Site'}
                            </span>
                          )}
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100/50">
                            {blog.category || 'Editorial'}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight leading-7 group-hover:text-indigo-600 transition-colors">
                        {blog.title || 'Untitled Fragment'}
                      </h3>
                      <p className="text-xs font-bold text-gray-400 line-clamp-2 leading-relaxed">
                        {blog.excerpt || 'Neural summary pending synchronization...'}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                            <User size={12} />
                          </div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">{blog.author || 'System'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                            <Calendar size={12} />
                          </div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">
                            {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={() => handlePreview(blog)}
                          className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Preview"
                        >
                          <Eye size={18} />
                        </button>
                        <Link
                          href={`/dashboard/blogs-editor/${blog?.siteId}?id=${blog?._id || blog?.id}`}
                          className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog?._id || blog?.id)}
                          className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedBlog && (
        <div className="fixed inset-0 bg-gray-950/20 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-500">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Editorial Preview</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Neural Visualization Node</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 flex-1">
              <img
                src={selectedBlog?.featuredImage || DEFAULT_BLOG_IMAGE}
                alt=""
                className="w-full h-80 object-cover rounded-[2.5rem] shadow-lg shadow-gray-200"
                onError={(e: any) => {
                  e.target.src = DEFAULT_BLOG_IMAGE;
                }}
              />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedBlog?.status)}
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-lg">
                    {selectedBlog.category || 'Standard Post'}
                  </span>
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
                  {selectedBlog?.title}
                </h1>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px]">
                      {selectedBlog.author?.charAt(0) || 'S'}
                    </div>
                    <span className="text-xs font-bold text-gray-500">{selectedBlog.author || 'System Agent'}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span className="text-xs font-bold text-gray-400">
                    Indexed {new Date(selectedBlog.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="prose prose-indigo max-w-none">
                <p className="text-lg text-gray-600 font-medium leading-relaxed italic border-l-4 border-indigo-100 pl-6 py-2">
                  {selectedBlog?.excerpt}
                </p>
                <div className="h-px bg-gray-100 w-full my-8" />
                <div className="text-gray-500 leading-relaxed space-y-4 py-4 font-medium">
                  <p>Content body synchronized from source repository...</p>
                  <p className="opacity-50 text-xs uppercase tracking-widest font-black">[ Full content rendering engine pending injection ]</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-900 text-white py-3 px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
              >
                Terminate Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
