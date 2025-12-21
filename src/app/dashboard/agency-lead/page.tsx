// components/LeadsDataTable.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Download, Plus, Mail, Phone, MoreVertical, 
  Eye, Edit, Trash2, Star, ChevronDown, ChevronUp, Calendar,
  TrendingUp, Building2, User, DollarSign, Clock, CheckCircle2,
  XCircle, AlertCircle, Tag, MessageSquare, X, Save
} from 'lucide-react';

// Types
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score: number;
  source: string;
  value: number;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  tags: string[];
  notes: number;
}

type SortField = keyof Lead;
type SortDirection = 'asc' | 'desc';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: Lead['status'];
  score: number;
  source: string;
  value: number;
  assignedTo: string;
  tags: string[];
}

// Sample Data
const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    status: 'qualified',
    score: 85,
    source: 'Website Form',
    value: 45000,
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-12-15',
    lastContact: '2024-12-20',
    tags: ['Enterprise', 'Hot Lead'],
    notes: 3
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.d@innovate.io',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Labs',
    status: 'proposal',
    score: 92,
    source: 'LinkedIn',
    value: 78000,
    assignedTo: 'Mike Wilson',
    createdAt: '2024-12-10',
    lastContact: '2024-12-19',
    tags: ['Enterprise', 'Decision Maker'],
    notes: 5
  },
  {
    id: '3',
    name: 'Robert Chen',
    email: 'r.chen@startupxyz.com',
    phone: '+1 (555) 345-6789',
    company: 'StartupXYZ',
    status: 'contacted',
    score: 65,
    source: 'Referral',
    value: 23000,
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-12-18',
    lastContact: '2024-12-18',
    tags: ['SMB', 'Warm'],
    notes: 1
  },
  {
    id: '4',
    name: 'Lisa Anderson',
    email: 'landerson@megacorp.com',
    phone: '+1 (555) 456-7890',
    company: 'MegaCorp Industries',
    status: 'negotiation',
    score: 88,
    source: 'Trade Show',
    value: 125000,
    assignedTo: 'David Lee',
    createdAt: '2024-12-05',
    lastContact: '2024-12-21',
    tags: ['Enterprise', 'Hot Lead', 'C-Level'],
    notes: 8
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'mbrown@digitalco.net',
    phone: '+1 (555) 567-8901',
    company: 'Digital Solutions Co',
    status: 'new',
    score: 45,
    source: 'Cold Outreach',
    value: 15000,
    assignedTo: 'Mike Wilson',
    createdAt: '2024-12-21',
    lastContact: '2024-12-21',
    tags: ['SMB'],
    notes: 0
  },
  {
    id: '6',
    name: 'Jennifer Taylor',
    email: 'jtaylor@cloudtech.io',
    phone: '+1 (555) 678-9012',
    company: 'CloudTech Systems',
    status: 'won',
    score: 95,
    source: 'Website Form',
    value: 89000,
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-11-28',
    lastContact: '2024-12-15',
    tags: ['Enterprise', 'Closed Won'],
    notes: 12
  }
];

const LeadsDataTable = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [tagInput, setTagInput] = useState('');

  // Form state
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'new',
    score: 50,
    source: '',
    value: 0,
    assignedTo: '',
    tags: []
  });

  // Status configuration
  const statusConfig = {
    new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: <AlertCircle className="w-3 h-3" /> },
    contacted: { label: 'Contacted', color: 'bg-purple-100 text-purple-700', icon: <Phone className="w-3 h-3" /> },
    qualified: { label: 'Qualified', color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-3 h-3" /> },
    proposal: { label: 'Proposal', color: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-3 h-3" /> },
    negotiation: { label: 'Negotiation', color: 'bg-orange-100 text-orange-700', icon: <TrendingUp className="w-3 h-3" /> },
    won: { label: 'Won', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="w-3 h-3" /> },
    lost: { label: 'Lost', color: 'bg-red-100 text-red-700', icon: <XCircle className="w-3 h-3" /> }
  };

  const sourceOptions = ['Website Form', 'LinkedIn', 'Referral', 'Trade Show', 'Cold Outreach', 'Google Ads', 'Webinar', 'Email Campaign'];
  const salesReps = ['Sarah Johnson', 'Mike Wilson', 'David Lee', 'Emma Davis'];

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'new',
      score: 50,
      source: '',
      value: 0,
      assignedTo: '',
      tags: []
    });
    setTagInput('');
  };

  // Handle Add Lead
  const handleAddLead = () => {
    const newLead: Lead = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: 0
    };
    
    setLeads([newLead, ...leads]);
    setShowAddModal(false);
    resetForm();
  };

  // Handle Edit Lead
  const handleEditClick = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      status: lead.status,
      score: lead.score,
      source: lead.source,
      value: lead.value,
      assignedTo: lead.assignedTo,
      tags: lead.tags
    });
    setShowEditModal(true);
    setShowActionMenu(null);
  };

  const handleUpdateLead = () => {
    if (!editingLead) return;
    
    setLeads(leads.map(lead => 
      lead.id === editingLead.id 
        ? { ...lead, ...formData, lastContact: new Date().toISOString().split('T')[0] }
        : lead
    ));
    
    setShowEditModal(false);
    setEditingLead(null);
    resetForm();
  };

  // Handle Delete
  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
      setShowActionMenu(null);
    }
  };

  // Handle Tag Addition
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  // Filtering and sorting
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [leads, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedLeads.length / itemsPerPage);
  const paginatedLeads = filteredAndSortedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads.size === paginatedLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(paginatedLeads.map(lead => lead.id)));
    }
  };

  const handleSelectLead = (id: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLeads(newSelected);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // Lead Form Modal Component
  const LeadFormModal = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button
            onClick={() => {
              isEdit ? setShowEditModal(false) : setShowAddModal(false);
              resetForm();
              setEditingLead(null);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Smith"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@company.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="TechCorp Inc."
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lead Source <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select source...</option>
                {sourceOptions.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assign To <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select sales rep...</option>
                {salesReps.map(rep => (
                  <option key={rep} value={rep}>{rep}</option>
                ))}
              </select>
            </div>

            {/* Deal Value */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Potential Value ($)
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50000"
                min="0"
              />
            </div>

            {/* Lead Score */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lead Score: <span className={`font-bold ${getScoreColor(formData.score)}`}>{formData.score}</span>
              </label>
              <input
                type="range"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="0"
                max="100"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Cold (0)</span>
                <span>Warm (50)</span>
                <span>Hot (100)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type a tag and press Enter"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
          <button
            onClick={() => {
              isEdit ? setShowEditModal(false) : setShowAddModal(false);
              resetForm();
              setEditingLead(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleUpdateLead : handleAddLead}
            disabled={!formData.name || !formData.email || !formData.phone || !formData.company || !formData.source || !formData.assignedTo}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isEdit ? 'Update Lead' : 'Add Lead'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      {/* Modals */}
      {showAddModal && <LeadFormModal />}
      {showEditModal && <LeadFormModal isEdit />}

      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="text-sm text-gray-500 mt-1">{filteredAndSortedLeads.length} total leads</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedLeads.size > 0 && (
          <div className="mt-4 flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">
              {selectedLeads.size} selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-white border border-blue-200 rounded hover:bg-blue-50">
                Assign
              </button>
              <button className="px-3 py-1 text-sm bg-white border border-blue-200 rounded hover:bg-blue-50">
                Change Status
              </button>
              <button className="px-3 py-1 text-sm bg-white border border-blue-200 rounded hover:bg-blue-50">
                Add Tags
              </button>
              <button className="px-3 py-1 text-sm bg-white border border-red-200 text-red-600 rounded hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedLeads.size === paginatedLeads.length && paginatedLeads.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                >
                  Lead Info
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('company')}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                >
                  Company
                  {sortField === 'company' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                >
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                >
                  Score
                  {sortField === 'score' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                >
                  Value
                  {sortField === 'value' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('lastContact')}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                >
                  Last Contact
                  {sortField === 'lastContact' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads.has(lead.id)}
                    onChange={() => handleSelectLead(lead.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{lead.phone}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{lead.company}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[lead.status].color}`}>
                    {statusConfig[lead.status].icon}
                    {statusConfig[lead.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold ${getScoreColor(lead.score)}`}>
                    <Star className="w-3 h-3" />
                    {lead.score}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    {lead.value.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{lead.source}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{lead.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="View Details">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleEditClick(lead)}
                      className="p-1.5 hover:bg-green-50 rounded transition-colors" 
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-purple-50 rounded transition-colors" title="Send Email">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowActionMenu(showActionMenu === lead.id ? null : lead.id)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {showActionMenu === lead.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Phone className="w-4 h-4" /> Call Lead
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Add Note
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Tag className="w-4 h-4" /> Add Tags
                          </button>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedLeads.length)} of {filteredAndSortedLeads.length} leads
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsDataTable;