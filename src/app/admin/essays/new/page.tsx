"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import AvInput from '@/components/ui/AvInput';
import AvSelect from '@/components/ui/AvSelect';
import AvRichTextEditor from '@/components/admin/AvRichTextEditor';
import { createPost } from '@/lib/supabase/db';
import { Save, Eye, ArrowLeft, Upload, X, Check } from 'lucide-react';

export default function NewEssayPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categoryOptions = [
    { value: 'STRATEGY', label: 'Strategy' },
    { value: 'TECHNOLOGY', label: 'Technology Engineering' },
    { value: 'AI_SYSTEMS', label: 'AI & Future Systems' },
    { value: 'FRAMEWORKS', label: 'Frameworks' },
    { value: 'RESEARCH', label: 'Research' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (publish: boolean = false) => {
    if (publish) {
      setIsPublishing(true);
    } else {
      setIsSaving(true);
    }
    setSaveMessage(null);

    const formData = new FormData(formRef.current!);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const readTime = parseInt(formData.get('readTime') as string) || 5;
    const seoDescription = formData.get('seoDescription') as string;

    if (!title || !content) {
      setSaveMessage({ type: 'error', text: 'Title and content are required.' });
      setIsSaving(false);
      setIsPublishing(false);
      return;
    }

    const post = await createPost({
      title,
      slug: generateSlug(title),
      content,
      summary: content.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
      category: category || 'STRATEGY',
      read_time: readTime,
      seo_description: seoDescription || undefined,
      published: publish,
      featured: false,
      content_type: 'essay',
    });

    setIsSaving(false);
    setIsPublishing(false);

    if (post) {
      setSaveMessage({ 
        type: 'success', 
        text: publish ? 'Essay published successfully!' : 'Draft saved successfully!'
      });
      setTimeout(() => {
        router.push('/admin/essays');
      }, 1500);
    } else {
      setSaveMessage({ type: 'error', text: 'Failed to save essay. Please try again.' });
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-charcoal">Create New Essay</h1>
              <p className="text-gray-500">Write and publish strategic intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving || isPublishing}
              className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving || isPublishing}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-azure text-white rounded-lg font-bold hover:bg-azure/90 transition-colors disabled:opacity-50"
            >
              {isPublishing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Eye size={18} />
              )}
              <span>Publish</span>
            </button>
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
              <AvSelect name="category" label="Category" options={categoryOptions} />
              <AvInput name="readTime" label="Read Time (minutes)" type="number" defaultValue={5} />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-charcoal mb-4">Featured Image</h3>
              <div className="grid grid-cols-2 gap-2">
                {previews.map((preview, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-100">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-charcoal/80 text-white rounded-full p-1 hover:bg-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <label className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-azure hover:bg-azure/5 transition-all">
                  <Upload size={20} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Upload</span>
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-charcoal mb-4">SEO</h3>
              <AvInput
                name="seoDescription"
                label="Meta Description"
                placeholder="Brief summary for search engines..."
              />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
