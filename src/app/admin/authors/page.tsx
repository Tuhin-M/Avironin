"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllAuthors, deleteAuthor, createAuthor, updateAuthor, Author } from '@/lib/supabase/db';
import { format } from 'date-fns';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  X,
  Upload,
  User as UserIcon
} from 'lucide-react';
import AvInput from '@/components/ui/AvInput';
import AvButton from '@/components/ui/AvButton';

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    avatar_url: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setIsLoading(true);
    const data = await getAllAuthors();
    setAuthors(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    
    const success = await deleteAuthor(id);
    if (success) {
      setAuthors(authors.filter(a => a.id !== id));
    }
  };

  const handleOpenModal = (author?: Author) => {
    if (author) {
      setEditingAuthor(author);
      setFormData({
        name: author.name,
        role: author.role || '',
        bio: author.bio || '',
        avatar_url: author.avatar_url || ''
      });
    } else {
      setEditingAuthor(null);
      setFormData({ name: '', role: '', bio: '', avatar_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    if (editingAuthor) {
      const updated = await updateAuthor(editingAuthor.id, formData);
      if (updated) {
        setAuthors(authors.map(a => a.id === updated.id ? updated : a));
        setIsModalOpen(false);
      }
    } else {
      const created = await createAuthor(formData);
      if (created) {
        setAuthors([...authors, created]);
        setIsModalOpen(false);
      }
    }
    setIsSaving(false);
  };

  const filteredAuthors = authors.filter(author => 
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (author.role || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Authors" subtitle="Manage content contributors">
      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent w-64"
          />
        </div>

        <AvButton 
          onClick={() => handleOpenModal()} 
          leftIcon={<Plus size={20} />}
        >
          New Author
        </AvButton>
      </div>

      {/* Authors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
             <div className="w-8 h-8 border-4 border-azure border-t-transparent rounded-full animate-spin mx-auto mb-4" />
             <p className="text-gray-500">Loading authors...</p>
          </div>
        ) : filteredAuthors.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No authors found</p>
            <button 
              onClick={() => handleOpenModal()}
              className="text-azure font-medium hover:underline"
            >
              Add your first author →
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAuthors.map((author) => (
                <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        {author.avatar_url ? (
                          <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-azure/10 text-azure">
                            <UserIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-charcoal">{author.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{author.bio}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                       {author.role || 'Contributor'}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {author.created_at ? format(new Date(author.created_at), 'MMM dd, yyyy') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenModal(author)}
                        className="p-2 text-gray-400 hover:text-azure hover:bg-azure/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-charcoal">
                {editingAuthor ? 'Edit Author' : 'New Author'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-charcoal transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <AvInput 
                name="name"
                label="Full Name"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              
              <AvInput 
                name="role"
                label="Role / Title"
                placeholder="e.g. Senior Editor"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Bio</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent min-h-[100px]"
                  placeholder="Short biography..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>

               <AvInput 
                name="avatar_url"
                label="Avatar URL"
                placeholder="https://..."
                value={formData.avatar_url}
                onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
              />
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <AvButton 
                  type="submit" 
                  isLoading={isSaving}
                >
                  {editingAuthor ? 'Save Changes' : 'Create Author'}
                </AvButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
