"use client";

import { useState, useRef } from 'react';
import AvContainer from '@/components/layout/AvContainer';
import AvSection from '@/components/layout/AvSection';
import AvForm from '@/components/ui/AvForm';
import AvInput from '@/components/ui/AvInput';
import AvSelect from '@/components/ui/AvSelect';
import AvButton from '@/components/ui/AvButton';
import AvRichTextEditor from '@/components/admin/AvRichTextEditor';
import { Upload, X, Save } from 'lucide-react';
import { createPost } from '@/lib/supabase/db';

/**
 * AdminEssayView Component
 * 
 * Central CMS view for creating and drafting intelligence essays.
 */
export default function AdminEssayView() {
    const [content, setContent] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
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

        const post = await createPost({
            title,
            slug: generateSlug(title),
            content,
            summary: content.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
            category: category || 'STRATEGY',
            read_time: readTime,
            seo_description: seoDescription || undefined,
            published: false, // Save as draft by default
            featured: false,
        });

        setIsSaving(false);
        if (post) {
            setSaveMessage({ type: 'success', text: 'Intelligence Essay Saved Successfully!' });
        } else {
            setSaveMessage({ type: 'error', text: 'Failed to save essay. Please try again.' });
        }
    };

    const categoryOptions = [
        { value: 'STRATEGY', label: 'Strategy' },
        { value: 'TECHNOLOGY', label: 'Technology Engineering' },
        { value: 'AI_SYSTEMS', label: 'AI & Future Systems' },
        { value: 'FRAMEWORKS', label: 'Frameworks' },
        { value: 'RESEARCH', label: 'Research' },
    ];

    return (
        <div className="pt-20">
            <AvSection variant="offwhite">
                <AvContainer>
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl">Draft New Intelligence</h1>
                            <p className="text-gray-500">Configure strategic content and technical diagrams.</p>
                        </div>
                        <AvButton onClick={handleSave} isLoading={isSaving} leftIcon={<Save size={18} />}>
                            Publish Essay
                        </AvButton>
                    </div>

                    <form ref={formRef} onSubmit={handleSave}>
                    {saveMessage && (
                        <div className={`mb-6 p-4 rounded-lg ${saveMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {saveMessage.text}
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Editor Side */}
                        <div className="lg:col-span-8 space-y-8">
                            <AvInput name="title" label="Essay Title" placeholder="Enter a compelling strategic title..." className="text-xl font-bold py-4" />

                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Rich Text Content</label>
                                <AvRichTextEditor content={content} onChange={setContent} />
                            </div>
                        </div>

                        {/* Sidebar Controls */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                            <AvSelect name="category" label="Target Category" options={categoryOptions} />
                                <AvInput name="readTime" label="Estimated Read Time (minutes)" type="number" defaultValue={10} />

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-charcoal">Featured Images & Media</label>

                                    <div className="grid grid-cols-2 gap-2">
                                        {previews.map((preview, idx) => (
                                            <div key={idx} className="relative aspect-square rounded overflow-hidden border border-gray-100">
                                                <img src={preview} alt="preview" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                                                <button
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-1 right-1 bg-charcoal/80 text-white rounded-full p-1 hover:bg-red-500"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-azure hover:bg-azure/5 transition-all">
                                            <Upload size={24} className="text-gray-400 mb-2" />
                                            <span className="text-[10px] uppercase font-black text-gray-500">Add Media</span>
                                            <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <AvButton variant="outline" className="w-full font-black uppercase tracking-widest text-xs">
                                        Save Draft
                                    </AvButton>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-widest text-coral mb-4">SEO Configuration</h4>
                                <AvInput name="seoDescription" label="Meta Description" placeholder="Brief summary for search engines..." />
                            </div>
                        </div>
                    </div>
                    </form>
                </AvContainer>
            </AvSection>
        </div>
    );
}
