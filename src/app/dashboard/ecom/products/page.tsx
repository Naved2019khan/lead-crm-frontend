"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Package,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Star,
  AlertTriangle,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  RefreshCw,
  ImageIcon,
  Tag,
  DollarSign,
  Hash,
  FileText,
  Layers,
  ShoppingCart,
  TrendingUp,
  ArrowUpDown,
  ChevronDown,
  Boxes,
  Upload,
  XCircle,
  Link as LinkIcon,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  sku: string;
  brand: string;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_MAP: Record<string, string> = {
  "65f1a7b8d92f4c1a23c9b111": "Footwear",
  "65f1a7b8d92f4c1a23c9b222": "Clothing",
  "65f1a7b8d92f4c1a23c9b333": "Electronics",
  "65f1a7b8d92f4c1a23c9b444": "TVs & Displays",
  "65f1a7b8d92f4c1a23c9b555": "Home & Living",
};

const CATEGORIES = Object.entries(CATEGORY_MAP).map(([id, name]) => ({ id, name }));
const BRANDS = ["Nike", "Adidas", "Levi's", "Apple", "Sony", "Samsung", "Puma", "Reebok", "Dell", "HP", "Other"];

const EMPTY_FORM = {
  name: "",
  price: "",
  description: "",
  sku: "",
  brand: "",
  category: "65f1a7b8d92f4c1a23c9b111",
  stock: "",
  isActive: true,
};

type ToastType = "success" | "error";
interface Toast { id: number; message: string; type: ToastType; }

const inputCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all";
const selectCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all appearance-none";

// ── Image Upload Component ─────────────────────────────────────────────────────
interface ImageUploadProps {
  images: string[];
  onChange: (urls: string[]) => void;
}

function ImageUpload({ images, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Max file size is 5 MB.");
      return;
    }
    setUploadError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) {
        onChange([...images, json.url]);
      } else {
        setUploadError(json.message || "Upload failed");
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(uploadFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http")) { setUploadError("Enter a valid URL starting with http"); return; }
    setUploadError("");
    onChange([...images, trimmed]);
    setUrlInput("");
    setShowUrlInput(false);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-square bg-gray-50">
              <img
                src={url}
                alt={`Product ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
              />
              {i === 0 && (
                <div className="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                  MAIN
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer group ${
          dragging
            ? "border-indigo-400 bg-indigo-50"
            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-xs font-bold text-indigo-600">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${dragging ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"}`}>
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-700">
                {dragging ? "Drop to upload" : "Click or drag images here"}
              </p>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">JPG, PNG, WebP, GIF · Max 5 MB each</p>
            </div>
          </div>
        )}
      </div>

      {/* URL input toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          {showUrlInput ? "Hide URL input" : "Add image via URL instead"}
        </button>

        {showUrlInput && (
          <div className="flex gap-2 mt-2 animate-in slide-in-from-top-2 duration-200">
            <input
              type="url"
              className={inputCls + " text-xs py-2.5"}
              placeholder="https://cdn.example.com/product.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUrl())}
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex-shrink-0"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {uploadError && (
        <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5 flex-shrink-0" /> {uploadError}
        </p>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function EcomProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [editStock, setEditStock] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [stockValue, setStockValue] = useState("");
  const [stockDelta, setStockDelta] = useState<"set" | "add" | "subtract">("set");

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const res = await fetch(`/api/products?${params}`);
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch {
      addToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  }, [search, addToast]);

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const stats = {
    total: products.length,
    active: products.filter((p) => p.isActive).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
  };

  const resetAddForm = () => {
    setForm({ ...EMPTY_FORM });
    setUploadedImages([]);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const body = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
        images: uploadedImages,
      };
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Product added successfully!");
        setShowAdd(false);
        resetAddForm();
        fetchProducts();
      }
    } catch {
      addToast("Failed to add product", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateStock = async () => {
    if (!editStock || stockValue === "") return;
    setFormLoading(true);
    const val = parseInt(stockValue);
    let newStock = val;
    if (stockDelta === "add") newStock = editStock.stock + val;
    if (stockDelta === "subtract") newStock = Math.max(0, editStock.stock - val);

    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editStock._id, stock: newStock }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Stock updated to ${newStock} units`);
        setEditStock(null);
        setStockValue("");
        setStockDelta("set");
        fetchProducts();
      }
    } catch {
      addToast("Failed to update stock", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product._id, isActive: !product.isActive }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Product ${!product.isActive ? "activated" : "deactivated"}`);
        fetchProducts();
      }
    } catch {
      addToast("Failed to update product", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/products?id=${deleteTarget._id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        addToast("Product deleted");
        setDeleteTarget(null);
        fetchProducts();
      }
    } catch {
      addToast("Failed to delete product", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const stockColor = (s: number) =>
    s === 0 ? "text-rose-600 bg-rose-50" : s <= 10 ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50";

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Toasts */}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-bold pointer-events-auto animate-in slide-in-from-right duration-300 ${
              t.type === "success"
                ? "bg-emerald-600 text-white shadow-emerald-200"
                : "bg-rose-600 text-white shadow-rose-200"
            }`}
          >
            {t.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {t.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Product Inventory</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your full product catalog & stock levels</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: stats.total, icon: <Boxes className="w-5 h-5" />, color: "bg-indigo-500" },
          { label: "Active", value: stats.active, icon: <CheckCircle2 className="w-5 h-5" />, color: "bg-emerald-500" },
          { label: "Low Stock", value: stats.lowStock, icon: <AlertTriangle className="w-5 h-5" />, color: "bg-amber-500" },
          { label: "Out of Stock", value: stats.outOfStock, icon: <ShoppingCart className="w-5 h-5" />, color: "bg-rose-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className={`${s.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-black text-gray-900">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand or SKU…"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium border border-transparent focus:border-indigo-200"
            />
          </div>
          <button
            onClick={() => fetchProducts()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-sm font-bold text-gray-400">Loading products…</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300">
              <Package className="w-8 h-8" />
            </div>
            <p className="text-sm font-black text-gray-400">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/60">
                  {["Product", "SKU / Brand", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setViewProduct(product)}
                        >
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p
                            className="font-black text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1 max-w-[180px]"
                            onClick={() => setViewProduct(product)}
                          >
                            {product.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] font-bold text-gray-400">{product.rating.toFixed(1)} ({product.reviewsCount})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-mono text-[11px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-lg inline-block">{product.sku}</p>
                      <p className="text-xs font-bold text-gray-400 mt-1">{product.brand}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        {CATEGORY_MAP[product.category] ?? "N/A"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-black text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${stockColor(product.stock)}`}>
                          {product.stock === 0 ? "Out of stock" : `${product.stock} units`}
                        </span>
                        <button
                          onClick={() => { setEditStock(product); setStockValue(""); setStockDelta("set"); }}
                          className="p-1.5 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleActive(product)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                          product.isActive
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {product.isActive ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                        {product.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setEditStock(product); setStockValue(""); setStockDelta("set"); }}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                          title="Edit stock"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════
          MODAL: ADD PRODUCT
      ══════════════════════════════════════════════════════════════════════════ */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-indigo-600 to-violet-700">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">Add New Product</h2>
                  <p className="text-indigo-200 text-xs font-bold">Fill in the details to add to catalog</p>
                </div>
              </div>
              <button
                onClick={() => { setShowAdd(false); resetAddForm(); }}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Product Name *
                  </label>
                  <input required className={inputCls} placeholder="e.g. Nike Air Max 270"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" /> Price (USD) *
                    </label>
                    <input required type="number" min="0" step="0.01" className={inputCls} placeholder="129.99"
                      value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Boxes className="w-3.5 h-3.5" /> Stock Quantity *
                    </label>
                    <input required type="number" min="0" className={inputCls} placeholder="43"
                      value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                  </div>
                </div>

                {/* SKU + Brand */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5" /> SKU *
                    </label>
                    <input required className={inputCls} placeholder="NIKE-AMX-270"
                      value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Brand *
                    </label>
                    <div className="relative">
                      <select required className={selectCls} value={form.brand}
                        onChange={(e) => setForm({ ...form, brand: e.target.value })}>
                        <option value="">Select brand…</option>
                        {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Category
                  </label>
                  <div className="relative">
                    <select className={selectCls} value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Description</label>
                  <textarea rows={3} className={inputCls + " resize-none"}
                    placeholder="Comfortable running shoes with breathable mesh upper…"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Product Images
                    {uploadedImages.length > 0 && (
                      <span className="ml-auto text-indigo-600 normal-case">
                        {uploadedImages.length} image{uploadedImages.length > 1 ? "s" : ""} added
                      </span>
                    )}
                  </label>
                  <ImageUpload images={uploadedImages} onChange={setUploadedImages} />
                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-sm font-black text-gray-900">Active Status</p>
                    <p className="text-xs font-bold text-gray-400 mt-0.5">Product will appear in the storefront</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      form.isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {form.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {form.isActive ? "Active" : "Inactive"}
                  </button>
                </div>

              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between flex-shrink-0">
                <button
                  type="button"
                  onClick={() => { setShowAdd(false); resetAddForm(); }}
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                >
                  {formLoading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Add Product</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          MODAL: EDIT STOCK
      ══════════════════════════════════════════════════════════════════════════ */}
      {editStock && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Edit Stock</h2>
                  <p className="text-orange-100 text-xs font-bold line-clamp-1 max-w-[200px]">{editStock.name}</p>
                </div>
              </div>
              <button onClick={() => setEditStock(null)} className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between border border-gray-100">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Stock</p>
                  <p className={`text-3xl font-black mt-1 ${editStock.stock === 0 ? "text-rose-600" : editStock.stock <= 10 ? "text-amber-600" : "text-emerald-600"}`}>
                    {editStock.stock}
                    <span className="text-sm font-bold ml-2 text-gray-400">units</span>
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stockColor(editStock.stock)}`}>
                  <Boxes className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Update Mode</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "set" as const, label: "Set to", icon: <ArrowUpDown className="w-3.5 h-3.5" /> },
                    { id: "add" as const, label: "Add", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                    { id: "subtract" as const, label: "Remove", icon: <TrendingUp className="w-3.5 h-3.5 rotate-180" /> },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setStockDelta(m.id)}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all border ${
                        stockDelta === m.id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                          : "bg-gray-50 text-gray-500 border-gray-100 hover:border-indigo-200 hover:text-indigo-600"
                      }`}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
                  {stockDelta === "set" ? "New Stock Value" : stockDelta === "add" ? "Units to Add" : "Units to Remove"}
                </label>
                <input
                  type="number"
                  min="0"
                  autoFocus
                  className={inputCls + " text-2xl font-black text-center"}
                  placeholder="0"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                />
                {stockValue !== "" && (
                  <p className="text-xs font-bold text-center text-indigo-600 mt-1">
                    New total:{" "}
                    <span className="font-black">
                      {stockDelta === "set"
                        ? parseInt(stockValue) || 0
                        : stockDelta === "add"
                        ? editStock.stock + (parseInt(stockValue) || 0)
                        : Math.max(0, editStock.stock - (parseInt(stockValue) || 0))}
                    </span>{" "}
                    units
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditStock(null)}
                  className="flex-1 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStock}
                  disabled={formLoading || stockValue === ""}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-2xl text-sm font-bold hover:bg-amber-600 transition-all shadow-xl shadow-amber-100 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                >
                  {formLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Update Stock</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          MODAL: DELETE CONFIRM
      ══════════════════════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl border border-gray-100 p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 flex-shrink-0">
                <Trash2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">Delete Product</h3>
                <p className="text-sm font-bold text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
              <p className="text-sm font-black text-rose-700 line-clamp-2">{deleteTarget.name}</p>
              <p className="text-xs font-bold text-rose-400 mt-1">SKU: {deleteTarget.sku}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={formLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-600 text-white rounded-2xl text-sm font-bold hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 disabled:opacity-60 active:scale-95"
              >
                {formLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Trash2 className="w-4 h-4" /> Delete</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          MODAL: VIEW PRODUCT
      ══════════════════════════════════════════════════════════════════════════ */}
      {viewProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/30 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setViewProduct(null)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 bg-gray-50 overflow-hidden">
              {viewProduct.images[0] ? (
                <img src={viewProduct.images[0]} alt={viewProduct.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <ImageIcon className="w-16 h-16" />
                </div>
              )}
              <button
                onClick={() => setViewProduct(null)}
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 rounded-xl shadow-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className={`text-xs font-black px-3 py-1.5 rounded-xl ${viewProduct.isActive ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {viewProduct.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {viewProduct.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                  +{viewProduct.images.length - 1} more
                </div>
              )}
            </div>

            <div className="p-7 space-y-5">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">{viewProduct.name}</h2>
                <p className="text-sm font-bold text-gray-400 mt-1">{viewProduct.brand} · {CATEGORY_MAP[viewProduct.category] ?? "Uncategorized"}</p>
              </div>

              {viewProduct.description && (
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{viewProduct.description}</p>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Price</p>
                  <p className="text-xl font-black text-indigo-700 mt-1">${viewProduct.price.toFixed(2)}</p>
                </div>
                <div className={`${stockColor(viewProduct.stock)} rounded-2xl p-4 text-center`}>
                  <p className="text-[10px] font-black opacity-70 uppercase tracking-widest">Stock</p>
                  <p className="text-xl font-black mt-1">{viewProduct.stock}</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Rating</p>
                  <p className="text-xl font-black text-amber-700 mt-1 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />{viewProduct.rating.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-gray-400 pt-2 border-t border-gray-50">
                <p>SKU: <span className="font-mono text-gray-600">{viewProduct.sku}</span></p>
                <p>{viewProduct.reviewsCount} reviews</p>
              </div>

              <button
                onClick={() => { setViewProduct(null); setEditStock(viewProduct); setStockValue(""); setStockDelta("set"); }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <BarChart3 className="w-4 h-4" /> Edit Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
