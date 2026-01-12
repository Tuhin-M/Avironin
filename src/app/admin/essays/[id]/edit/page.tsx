"use client";

export const runtime = 'edge';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import AvInput from '@/components/ui/AvInput';
import AvSelect from '@/components/ui/AvSelect';
import AvRichTextEditor from '@/components/admin/AvRichTextEditor';
import { getPostById, updatePost, Post } from '@/lib/supabase/db';
import { Save, Eye, ArrowLeft, Upload, X, Check, EyeOff } from 'lucide-react';

export default function EditEssayPage() {
  const router = useRouter();
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categoryOptions = [
    { value: 'STRATEGY', label: 'Strategy' },
    { value: 'TECHNOLOGY', label: 'Technology Engineering' },
    { value: 'AI_SYSTEMS', label: 'AI & Future Systems' },
    { value: 'FRAMEWORKS', label: 'Frameworks' },
    { value: 'RESEARCH', label: 'Research' },
  ];

  useEffect(() => {
    const fetchPost = async () => {
      if (params.id) {
        const data = await getPostById(params.id as string);
        if (data) {
          setPost(data);
          setContent(data.content);
        }
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (publish?: boolean) => {
    setIsSaving(true);
    setSaveMessage(null);

    const formData = new FormData(formRef.current!);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const readTime = parseInt(formData.get('readTime') as string) || 5;
    const seoDescription = formData.get('seoDescription') as string;

    if (!title || !content) {
      setSaveMessage({ type: 'error', text: 'Title and content are required.' });
      setIsSaving(false);
      return;
    }

    const updatedPost = await updatePost(post!.id, {
      title,
      slug: generateSlug(title),
      content,
      summary: content.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
      category: category || 'STRATEGY',
      read_time: readTime,
      seo_description: seoDescription || undefined,
      published: publish !== undefined ? publish : post?.published,
    });

    setIsSaving(false);

    if (updatedPost) {
      setPost(updatedPost);
      setSaveMessage({ type: 'success', text: 'Essay updated successfully!' });
    } else {
      setSaveMessage({ type: 'error', text: 'Failed to update essay. Please try again.' });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-azure border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Essay not found</p>
          <button
            onClick={() => router.push('/admin/essays')}
            className="text-azure font-medium hover:underline"
          >
            ← Back to Essays
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/essays')}
              className="p-2 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-charcoal">Edit Essay</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-bold ${
                  post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{post.published ? 'Published' : 'Draft'}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSave()}
              disabled={isSaving}
              className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>Save Changes</span>
            </button>
            {!post.published ? (
              <button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-azure text-white rounded-lg font-bold hover:bg-azure/90 transition-colors disabled:opacity-50"
              >
                <Eye size={18} />
                <span>Publish</span>
              </button>
            ) : (
              <button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50"
              >
                <EyeOff size={18} />
                <span>Unpublish</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            saveMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {saveMessage.type === 'success' ? <Check size={20} /> : <X size={20} />}
            <span>{saveMessage.text}</span>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <AvInput
                name="title"
                label="Essay Title"
                placeholder="Enter a compelling strategic title..."
                defaultValue={post.title}
                className="text-xl font-bold"
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-charcoal mb-3">Content</label>
              <AvRichTextEditor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-bold text-charcoal">Post Settings</h3>
              <AvSelect 
                name="category" 
                label="Category" 
                options={categoryOptions} 
                defaultValue={post.category}
              />
              <AvInput 
                name="readTime" 
                label="Read Time (minutes)" 
                type="number" 
                defaultValue={post.read_time || 5} 
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-charcoal mb-4">Featured Image</h3>
              {post.image_url ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100">
                  <img src={post.image_url} alt="Featured" className="w-full h-full object-cover" />
                </div>
              ) : (
                <label className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-azure hover:bg-azure/5 transition-all">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-charcoal mb-4">SEO</h3>
              <AvInput
                name="seoDescription"
                label="Meta Description"
                placeholder="Brief summary for search engines..."
                defaultValue={post.seo_description || ''}
              />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
