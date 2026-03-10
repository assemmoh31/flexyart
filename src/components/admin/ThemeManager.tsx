import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  UploadCloud, 
  X, 
  Check, 
  Image as ImageIcon, 
  Film,
  Tag as TagIcon,
  PlayCircle
} from 'lucide-react';
import { useThemeCategories, ThemeCategory } from '../../context/ThemeCategoryContext';

// Mock Data
const initialThemes = [
  { id: 1, title: 'Neon Genesis', game: 'Cyberpunk 2077', price: 2000, type: 'animated', status: 'Active', preview: 'https://picsum.photos/seed/theme1/300/200', category: 'Backgrounds', video: 'https://cdn.pixabay.com/video/2023/10/26/186639-878456839_large.mp4' },
  { id: 2, title: 'Tranquil Zen', game: 'Sekiro', price: 500, type: 'static', status: 'Active', preview: 'https://picsum.photos/seed/theme2/300/200', category: 'Backgrounds' },
  { id: 3, title: 'Abyssal Depths', game: 'Subnautica', price: 2500, type: 'animated', status: 'Draft', preview: 'https://picsum.photos/seed/theme3/300/200', category: 'Backgrounds', video: 'https://cdn.pixabay.com/video/2023/09/24/181956-867864887_large.mp4' },
  { id: 4, title: 'Cyber Skull', game: 'Cyberpunk 2077', price: 1000, type: 'animated', status: 'Active', preview: 'https://picsum.photos/seed/avatar1/400/400', category: 'Avatars', video: 'https://cdn.pixabay.com/video/2023/10/22/186175-877653483_large.mp4' },
  { id: 5, title: 'Neon Border', game: 'Starfield', price: 2000, type: 'animated', status: 'Active', preview: 'https://picsum.photos/seed/frame1/400/400', category: 'Frames', video: 'https://cdn.pixabay.com/video/2023/10/22/186175-877653483_large.mp4' },
];

const COLOR_OPTIONS = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#000000' },
];

const ALL_CATEGORIES: ThemeCategory[] = ['Backgrounds', 'Avatars', 'Frames', 'Profiles', 'Emoticons', 'Stickers'];

export default function ThemeManager() {
  const { categories, toggleCategory } = useThemeCategories();
  const [themes, setThemes] = useState(initialThemes);
  const [activeManageCategory, setActiveManageCategory] = useState<ThemeCategory>('Backgrounds');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    price: 0,
    link: '',
    type: 'static' as 'static' | 'animated',
    status: 'Active' as 'Draft' | 'Active' | 'Hidden',
    colors: [] as string[],
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPreviewFiles(prev => [...prev, ...files]);
      setPreviewUrls(prev => [...prev, ...files.map((f: any) => URL.createObjectURL(f))]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      setPreviewFiles(prev => [...prev, ...files]);
      setPreviewUrls(prev => [...prev, ...files.map((f: any) => URL.createObjectURL(f))]);
    }
  };

  const removeFile = (index: number) => {
    setPreviewFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const toggleColor = (hex: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(hex) 
        ? prev.colors.filter(c => c !== hex)
        : [...prev.colors, hex]
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const newTheme = {
        id: Math.random(),
        title: formData.title,
        game: formData.game,
        price: formData.price,
        type: formData.type,
        status: formData.status,
        category: activeManageCategory,
        preview: previewUrls[0] || 'https://picsum.photos/seed/new/300/200',
        video: previewFiles[0]?.type.startsWith('video/') ? previewUrls[0] : undefined
      };

      setThemes([newTheme, ...themes]);
      setIsModalOpen(false);
      showToast(`${activeManageCategory.slice(0, -1)} successfully created!`, 'success');
      
      // Reset form
      setFormData({
        title: '', game: '', price: 0, link: '', type: 'static', status: 'Active', colors: [], tags: []
      });
      setPreviewFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      showToast('Failed to create item.', 'error');
    }
  };

  const filteredThemes = themes.filter(t => 
    t.category === activeManageCategory &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.game.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openModal = () => {
    setFormData({
      title: '', game: '', price: 0, link: '', type: 'static', status: 'Active', colors: [], tags: []
    });
    setPreviewFiles([]);
    setPreviewUrls([]);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top-5 ${toast.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {toast.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Category Visibility Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Storefront Category Visibility</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ALL_CATEGORIES.map((category) => (
            <div key={category} className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sm font-medium text-slate-300">{category}</span>
              <button
                onClick={() => toggleCategory(category)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  categories[category] ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    categories[category] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Management Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-800">
        {ALL_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveManageCategory(category)}
            className={`px-6 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
              activeManageCategory === category
                ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Manage {activeManageCategory}</h2>
        <button 
          onClick={openModal}
          className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          <Plus className="w-5 h-5" /> Add New {activeManageCategory.slice(0, -1)}
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input 
            type="text" 
            placeholder={`Search ${activeManageCategory.toLowerCase()} by name or game...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredThemes.map(theme => (
          <AdminThemeCard key={theme.id} theme={theme} />
        ))}
        {filteredThemes.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
            No items found in this category.
          </div>
        )}
      </div>

      {/* Dynamic Add New Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-cyan-500/50 rounded-2xl max-w-3xl w-full my-8 shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col max-h-[90vh] backdrop-blur-xl">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                Add New {activeManageCategory.slice(0, -1)}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="theme-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Dynamic Media Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Media Upload</label>
                  
                  {/* Frames: Circular Preview */}
                  {activeManageCategory === 'Frames' && (
                    <div className="flex flex-col items-center gap-4">
                      <div 
                        className="w-48 h-48 rounded-full border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-900 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {previewUrls[0] ? (
                          <>
                            {previewFiles[0]?.type.startsWith('video/') ? (
                              <video src={previewUrls[0]} autoPlay loop muted className="w-full h-full object-cover" />
                            ) : (
                              <img src={previewUrls[0]} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <UploadCloud className="w-6 h-6 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-4">
                            <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                            <span className="text-xs text-slate-400">Upload Frame</span>
                          </div>
                        )}
                      </div>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/webm,video/mp4" onChange={handleFileChange} />
                    </div>
                  )}

                  {/* Emoticons & Stickers: Grid Upload */}
                  {(activeManageCategory === 'Emoticons' || activeManageCategory === 'Stickers') && (
                    <div 
                      className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-6 bg-slate-900/50 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-4">
                        {previewUrls.map((url, idx) => (
                          <div key={idx} className="aspect-square rounded-lg bg-slate-800 relative group overflow-hidden border border-slate-700">
                            {previewFiles[idx]?.type.startsWith('video/') ? (
                              <video src={url} autoPlay loop muted className="w-full h-full object-cover" />
                            ) : (
                              <img src={url} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            <button 
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-lg border-2 border-dashed border-slate-700 hover:border-cyan-500 flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/webm,video/mp4" multiple onChange={handleFileChange} />
                      <p className="text-center text-sm text-slate-500">Drag & drop multiple files here</p>
                    </div>
                  )}

                  {/* Default: Standard Upload */}
                  {['Backgrounds', 'Avatars', 'Profiles'].includes(activeManageCategory) && (
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${previewUrls.length > 0 ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-700 hover:border-cyan-500 hover:bg-slate-800/50'}`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/webm,video/mp4" onChange={handleFileChange} />
                      
                      {previewUrls[0] ? (
                        <div className={`relative mx-auto rounded-lg overflow-hidden border border-slate-700 bg-black ${activeManageCategory === 'Avatars' ? 'w-48 aspect-square' : 'w-full max-w-md aspect-video'}`}>
                          {previewFiles[0]?.type.startsWith('video/') ? (
                            <video src={previewUrls[0]} autoPlay loop muted className="w-full h-full object-cover" />
                          ) : (
                            <img src={previewUrls[0]} alt="Preview" className="w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-medium flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Change File</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6">
                          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <UploadCloud className="w-8 h-8" />
                          </div>
                          <p className="text-white font-medium mb-1">Drag & drop high-res preview</p>
                          <p className="text-slate-500 text-sm">Supports .JPG, .PNG, .WEBM, .MP4 up to 50MB</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Core Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="e.g., Neon Cityscape"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Game Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.game}
                      onChange={e => setFormData({...formData, game: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="e.g., Cyberpunk 2077"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Steam Points Price</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <input 
                        type="number" 
                        required
                        min="0"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Steam Market/Points Shop Link</label>
                    <input 
                      type="url" 
                      value={formData.link}
                      onChange={e => setFormData({...formData, link: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="https://steamcommunity.com/..."
                    />
                  </div>
                </div>

                {/* Categorization & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type Toggle (Hidden for Frames and Emoticons) */}
                  {['Avatars', 'Profiles', 'Stickers', 'Backgrounds'].includes(activeManageCategory) && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                      <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, type: 'static'})}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${formData.type === 'static' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                          <ImageIcon className="w-4 h-4" /> Static
                        </button>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, type: 'animated'})}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${formData.type === 'animated' ? 'bg-slate-800 text-purple-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                          <Film className="w-4 h-4" /> Animated
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                      {(['Draft', 'Active', 'Hidden'] as const).map(status => (
                        <button 
                          key={status}
                          type="button"
                          onClick={() => setFormData({...formData, status})}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                            formData.status === status 
                              ? status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advanced Filtering Metadata */}
                <div className="space-y-6 border-t border-slate-800 pt-6">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-cyan-400" /> Tags & Metadata
                  </h4>
                  
                  {/* Style Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Style Tags</label>
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 focus-within:border-cyan-500 transition-colors flex flex-wrap gap-2 items-center min-h-[46px]">
                      {formData.tags.map(tag => (
                        <span key={tag} className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md text-sm flex items-center gap-1 border border-slate-700">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-400 focus:outline-none">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input 
                        type="text" 
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder={formData.tags.length === 0 ? "Type a tag and press Enter..." : "Add another tag..."}
                        className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm min-w-[200px] py-1 px-2"
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3 shrink-0">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="theme-form"
                className="px-6 py-2.5 rounded-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center gap-2"
              >
                <Check className="w-5 h-5" /> Save Item
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// Admin Theme Card Component with Hover-to-Play
const AdminThemeCard: React.FC<{ theme: any }> = ({ theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isCircular = theme.category === 'Frames';
  const isSquare = ['Emoticons', 'Stickers', 'Avatars', 'Frames'].includes(theme.category);

  return (
    <div 
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-colors flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative bg-slate-950 flex items-center justify-center overflow-hidden ${isSquare ? 'aspect-square' : 'aspect-video'}`}>
        {theme.type === 'animated' && isHovered && theme.video ? (
          <video 
            ref={videoRef}
            src={theme.video}
            muted
            loop
            className={`w-full h-full object-cover ${isCircular ? 'scale-75 rounded-full border-4 border-slate-800' : ''}`}
          />
        ) : (
          <img 
            src={theme.preview} 
            alt={theme.title} 
            className={`w-full h-full object-cover ${isCircular ? 'scale-75 rounded-full border-4 border-slate-800' : ''}`} 
          />
        )}
        
        <div className="absolute top-2 right-2 flex gap-1">
          {theme.type === 'animated' && (
            <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-purple-400 border border-purple-500/30">
              <PlayCircle className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className={`px-2 py-1 rounded text-xs font-bold backdrop-blur-md ${
            theme.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
            theme.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
            'bg-slate-800/80 text-slate-300 border border-slate-600'
          }`}>
            {theme.status}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-white font-bold truncate">{theme.title}</h4>
          <p className="text-sm text-slate-500 truncate">{theme.game}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-cyan-400 font-bold text-sm bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
            {theme.price.toLocaleString()} pts
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
