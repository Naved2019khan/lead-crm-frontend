"use client"
import React, { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Link, Image, Eye, Save } from 'lucide-react';
import { blogAPI } from '@/services/api/blog-api';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const fallback = {
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    author: '',
    category: '',
    featuredImage: '',
    content: '',
    status: 'draft'
  }

export default function BlogEditor({ initialData = fallback }) {
  const [formData, setFormData] = useState(initialData);
  const { siteId } = useParams()

  const [preview, setPreview] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      const slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let newText = '';

    switch(format) {
      case 'h1':
        newText = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        newText = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'h3':
        newText = `### ${selectedText || 'Heading 3'}`;
        break;
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'link':
        newText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'image':
        newText = `![alt text](image-url)`;
        break;
      case 'ul':
        newText = `\n- ${selectedText || 'List item'}\n- List item\n- List item`;
        break;
      case 'ol':
        newText = `\n1. ${selectedText || 'List item'}\n2. List item\n3. List item`;
        break;
    }

    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-4" />')
      .replace(/^\d+\.\s(.*)$/gim, '<li class="ml-6">$1</li>')
      .replace(/^-\s(.*)$/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/\n/g, '<br />');
  };

  const handleSave = async () => {
    const blogData = {
      ...formData,
      siteId : parseInt(siteId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    // console.log(blogData)

    const response = await blogAPI.create(blogData);
    
    toast.success('Blog post saved! Check console for data.');
    // alert('Blog post saved! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Professional Blog Editor</h1>
            <p className="text-blue-100 text-sm mt-1">Create SEO-optimized blog content</p>
          </div>

          <div className="p-6">
            {/* SEO Meta Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm mr-2">SEO</span>
                Meta Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your blog title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="blog-post-url"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optimized title for search engines"
                    maxLength="60"
                  />
                  <span className="text-xs text-gray-500">{formData.metaTitle.length}/60 characters</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="react, nextjs, web development"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInput}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description for search results"
                    maxLength="160"
                  />
                  <span className="text-xs text-gray-500">{formData.metaDescription.length}/160 characters</span>
                </div>
              </div>
            </div>

            {/* Blog Details Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Blog Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Content Editor Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Content Editor</h2>
                <button
                  onClick={() => setPreview(!preview)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye size={18} />
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>

              {!preview && (
                <>
                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <button onClick={() => insertFormatting('h1')} className="p-2 hover:bg-gray-200 rounded" title="Heading 1">
                      <Heading1 size={20} />
                    </button>
                    <button onClick={() => insertFormatting('h2')} className="p-2 hover:bg-gray-200 rounded" title="Heading 2">
                      <Heading2 size={20} />
                    </button>
                    <button onClick={() => insertFormatting('h3')} className="p-2 hover:bg-gray-200 rounded" title="Heading 3">
                      <Heading3 size={20} />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button onClick={() => insertFormatting('bold')} className="p-2 hover:bg-gray-200 rounded" title="Bold">
                      <Bold size={20} />
                    </button>
                    <button onClick={() => insertFormatting('italic')} className="p-2 hover:bg-gray-200 rounded" title="Italic">
                      <Italic size={20} />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button onClick={() => insertFormatting('ul')} className="p-2 hover:bg-gray-200 rounded" title="Bullet List">
                      <List size={20} />
                    </button>
                    <button onClick={() => insertFormatting('ol')} className="p-2 hover:bg-gray-200 rounded" title="Numbered List">
                      <ListOrdered size={20} />
                    </button>
                    <div className="w-px bg-gray-300 mx-1"></div>
                    <button onClick={() => insertFormatting('link')} className="p-2 hover:bg-gray-200 rounded" title="Insert Link">
                      <Link size={20} />
                    </button>
                    <button onClick={() => insertFormatting('image')} className="p-2 hover:bg-gray-200 rounded" title="Insert Image">
                      <Image size={20} />
                    </button>
                  </div>

                  <textarea
                    id="content-editor"
                    name="content"
                    value={formData.content}
                    onChange={handleInput}
                    rows="16"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Write your blog content here... Use markdown formatting!"
                  />
                </>
              )}

              {preview && (
                <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-96">
                  {formData.featuredImage && (
                    <img src={formData.featuredImage} alt="Featured" className="w-full h-64 object-cover rounded-lg mb-6" />
                  )}
                  <h1 className="text-4xl font-bold mb-4">{formData.title || 'Blog Title'}</h1>
                  <div className="flex gap-4 text-sm text-gray-600 mb-6">
                    {formData.author && <span>By {formData.author}</span>}
                    {formData.category && <span>• {formData.category}</span>}
                    <span>• {new Date().toLocaleDateString()}</span>
                  </div>
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(formData.content || 'Your content preview will appear here...') }}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
              <button
                onClick={() => setFormData({
                  title: '', slug: '', metaTitle: '', metaDescription: '', 
                  keywords: '', author: '', category: '', featuredImage: '', 
                  content: '', status: 'draft'
                })}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Clear All
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={18} />
                Save Blog Post
              </button>
            </div>
          </div>
        </div>

        {/* SEO Preview Card */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Google Search Preview</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="text-blue-600 text-xl font-medium mb-1">
              {formData.metaTitle || formData.title || 'Your Blog Title'}
            </div>
            <div className="text-green-700 text-sm mb-2">
              https://yoursite.com/blog/{formData.slug || 'blog-post-url'}
            </div>
            <div className="text-gray-600 text-sm">
              {formData.metaDescription || 'Your meta description will appear here. Make it compelling to improve click-through rates from search results.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}