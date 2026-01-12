"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Undo, Redo, ImageIcon, Heading1, Heading2, Quote } from 'lucide-react';
import { useCallback } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 bg-offwhite/50 backdrop-blur sticky top-0 z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('bold') ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="Bold"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('italic') ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="Italic"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="H1"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="H2"
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('bulletList') ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="Bullet List"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('orderedList') ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="Ordered List"
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-azure/10 transition-colors ${editor.isActive('blockquote') ? 'text-azure bg-azure/10' : 'text-gray-600'}`}
                title="Quote"
            >
                <Quote size={18} />
            </button>
            <div className="w-[1px] h-8 bg-gray-200 mx-2" />
            <button
                onClick={addImage}
                className="p-2 rounded hover:bg-azure/10 transition-colors text-gray-600"
                title="Insert Image"
            >
                <ImageIcon size={18} />
            </button>
            <div className="w-[1px] h-8 bg-gray-200 mx-2" />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded hover:bg-azure/10 transition-colors text-gray-600"
                title="Undo"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded hover:bg-azure/10 transition-colors text-gray-600"
                title="Redo"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

const AvRichTextEditor = ({ content, onChange }: { content: string; onChange: (html: string) => void }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-8 border border-gray-100',
                },
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none p-8 focus:outline-none min-h-[400px]',
            },
        },
    });

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-azure/20 focus-within:border-azure transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default AvRichTextEditor;
