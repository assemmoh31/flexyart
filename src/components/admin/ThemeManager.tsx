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
  Tag as TagIcon
} from 'lucide-react';

// Mock Data
const initialThemes = [
  { id: 1, title: 'Neon Genesis', game: 'Cyberpunk 2077', price: 2000, type: 'animated', status: 'Active', preview: 'https://picsum.photos/seed/theme1/300/200' },
  { id: 2, title: 'Tranquil Zen', game: 'Sekiro', price: 500, type: 'static', status: 'Active', preview: 'https://picsum.photos/seed/theme2/300/200' },
  { id: 3, title: 'Abyssal Depths', game: 'Subnautica', price: 2500, type: 'animated', status: 'Draft', preview: 'https://picsum.photos/seed/theme3/300/200' },
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

export default function ThemeManager() {
  const [themes, setThemes] = useState(initialThemes);
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
    rarity: 'Common',
    colors: [] as string[],
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
    
    // Mocking the API call to Cloudflare Pages Function
    try {
      // In a real app, you would use FormData to send the file and JSON data
      /*
      const submitData = new FormData();
      if (previewFile) submitData.append('file', previewFile);
      submitData.append('metadata', JSON.stringify(formData));
      
      const response = await fetch('/api/themes', {
        method: 'POST',
        body: submitData
      });
      */

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const newTheme = {
        id: Math.random(),
        title: formData.title,
        game: formData.game,
        price: formData.price,
        type: formData.type,
        status: 'Active',
        preview: previewUrl || 'https://picsum.photos/seed/new/300/200'
      };

      setThemes([newTheme, ...themes]);
      setIsModalOpen(false);
      showToast('Theme successfully created and uploaded to R2!', 'success');
      
      // Reset form
      setFormData({
        title: '', game: '', price: 0, link: '', type: 'static', rarity: 'Common', colors: [], tags: []
      });
      setPreviewFile(null);
      setPreviewUrl(null);
    } catch (error) {
      showToast('Failed to create theme.', 'error');
    }
  };

  const filteredThemes = themes.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.game.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top-5 ${toast.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {toast.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Theme Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          <Plus className="w-5 h-5" /> Add New Theme
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search themes by name or game..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-cyan-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Themes Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Preview</th>
                <th className="p-4 font-medium">Name & Game</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredThemes.map(theme => (
                <tr key={theme.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <div className="w-24 h-16 rounded border border-slate-700 overflow-hidden bg-slate-950 relative">
                      <img src={theme.preview} alt={theme.title} className="w-full h-full object-cover" />
                      {theme.type === 'animated' && (
                        <div className="absolute top-1 right-1 bg-black/60 rounded p-0.5">
                          <Film className="w-3 h-3 text-purple-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">{theme.title}</div>
                    <div className="text-sm text-slate-500">{theme.game}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${theme.type === 'animated' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                      {theme.type === 'animated' ? 'Animated' : 'Static'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-white font-medium">
                      <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      {theme.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${theme.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {theme.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredThemes.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No themes found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Add New Theme Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full my-8 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                Add New Theme
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="theme-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Media Upload (R2 Storage)</label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${previewUrl ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-700 hover:border-cyan-500 hover:bg-slate-800/50'}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/webm,video/mp4" onChange={handleFileChange} />
                    
                    {previewUrl ? (
                      <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black">
                        {previewFile?.type.startsWith('video/') ? (
                          <video src={previewUrl} autoPlay loop muted className="w-full h-full object-cover" />
                        ) : (
                          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
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
                </div>

                {/* Core Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Theme Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
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
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
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
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Steam Market/Points Shop Link</label>
                    <input 
                      type="url" 
                      value={formData.link}
                      onChange={e => setFormData({...formData, link: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="https://steamcommunity.com/..."
                    />
                  </div>
                </div>

                {/* Categorization & Rarity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Theme Type</label>
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-700">
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
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Rarity Tier</label>
                    <select 
                      value={formData.rarity}
                      onChange={e => setFormData({...formData, rarity: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="Common">Common</option>
                      <option value="Uncommon">Uncommon</option>
                      <option value="Rare">Rare</option>
                      <option value="Epic">Epic</option>
                      <option value="Legendary">Legendary</option>
                    </select>
                  </div>
                </div>

                {/* Advanced Filtering Metadata */}
                <div className="space-y-6 border-t border-slate-800 pt-6">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-cyan-400" /> Advanced Filtering Metadata
                  </h4>
                  
                  {/* Color Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Dominant Colors (Select up to 3)</label>
                    <div className="flex flex-wrap gap-3">
                      {COLOR_OPTIONS.map(color => {
                        const isSelected = formData.colors.includes(color.hex);
                        return (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() => toggleColor(color.hex)}
                            className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-slate-700 hover:border-slate-500'}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {isSelected && <Check className={`w-5 h-5 ${color.hex === '#ffffff' ? 'text-black' : 'text-white'}`} style={{ mixBlendMode: 'difference' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Style Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Style Tags</label>
                    <div className="bg-slate-950 border border-slate-700 rounded-lg p-2 focus-within:border-cyan-500 transition-colors flex flex-wrap gap-2 items-center min-h-[46px]">
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
                        placeholder={formData.tags.length === 0 ? "Type a tag and press Enter (e.g., Anime, Cyberpunk)..." : "Add another tag..."}
                        className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm min-w-[200px] py-1 px-2"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Press Enter to add a tag. Used for search auto-complete.</p>
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/50 rounded-b-2xl flex justify-end gap-3 shrink-0">
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
                className="px-6 py-2.5 rounded-lg font-bold bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center gap-2"
              >
                <Check className="w-5 h-5" /> Save & Publish
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
