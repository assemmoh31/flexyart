import React, { useState } from 'react';
import { 
  Tag, 
  Gamepad2, 
  Monitor, 
  Palette, 
  User, 
  Plus, 
  Search, 
  GitMerge, 
  Trash2, 
  Check, 
  X,
  AlertCircle,
  Edit
} from 'lucide-react';

type TagCategory = 'games' | 'software' | 'styles' | 'characters';

interface TagItem {
  id: string;
  name: string;
  count: number;
  category: TagCategory;
  aliases?: string[];
}

export default function TagMaster() {
  const [activeTab, setActiveTab] = useState<TagCategory>('games');
  const [allowUserCreation, setAllowUserCreation] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  const [mergeSource, setMergeSource] = useState<TagItem | null>(null);
  const [mergeTargetInput, setMergeTargetInput] = useState('');
  
  // Alias Editing State
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const [newAliasInput, setNewAliasInput] = useState('');

  // Mock Data
  const [tags, setTags] = useState<TagItem[]>([
    { id: '1', name: 'GTA 6', count: 1250, category: 'games' },
    { id: '2', name: 'Elden Ring', count: 890, category: 'games' },
    { id: '3', name: 'Counter-Strike 2', count: 3400, category: 'games', aliases: ['CS2', 'CS:GO', 'Counterstrike'] },
    { id: '4', name: 'After Effects', count: 5600, category: 'software' },
    { id: '5', name: 'Blender', count: 4200, category: 'software' },
    { id: '6', name: 'Photoshop', count: 3100, category: 'software' },
    { id: '7', name: 'Adobe AE', count: 45, category: 'software' }, // Candidate for merge
    { id: '8', name: 'Anime', count: 450, category: 'styles' },
    { id: '9', name: 'Cyberpunk', count: 320, category: 'styles' },
    { id: '10', name: 'Minimalist', count: 210, category: 'styles' },
    { id: '11', name: 'Lucia', count: 120, category: 'characters' },
    { id: '12', name: 'Jin Sakai', count: 85, category: 'characters' },
    { id: '13', name: 'Master Chief', count: 340, category: 'characters' },
  ]);

  const filteredTags = tags.filter(tag => 
    tag.category === activeTab && 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => b.count - a.count);

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    
    const newTag: TagItem = {
      id: Date.now().toString(),
      name: newTagInput.trim(),
      count: 0,
      category: activeTab
    };
    
    setTags([newTag, ...tags]);
    setNewTagInput('');
  };

  const handleMerge = (source: TagItem) => {
    // In a real app, this would open a modal to select the target tag
    // For this UI demo, we'll just set the source and show a simple inline merge UI
    setMergeSource(source);
    setEditingTag(null);
    setMergeTargetInput('');
  };

  const handleEdit = (tag: TagItem) => {
    setEditingTag(tag);
    setMergeSource(null);
    setNewAliasInput('');
  };

  const addAlias = () => {
    if (!editingTag || !newAliasInput.trim()) return;
    
    const updatedTag = { 
      ...editingTag, 
      aliases: [...(editingTag.aliases || []), newAliasInput.trim()] 
    };
    
    setTags(tags.map(t => t.id === editingTag.id ? updatedTag : t));
    setEditingTag(updatedTag);
    setNewAliasInput('');
  };

  const removeAlias = (aliasToRemove: string) => {
    if (!editingTag) return;
    
    const updatedTag = {
      ...editingTag,
      aliases: (editingTag.aliases || []).filter(a => a !== aliasToRemove)
    };
    
    setTags(tags.map(t => t.id === editingTag.id ? updatedTag : t));
    setEditingTag(updatedTag);
  };

  const confirmMerge = () => {
    if (!mergeSource || !mergeTargetInput.trim()) return;

    // Find target tag
    const targetTag = tags.find(t => 
      t.category === activeTab && 
      t.name.toLowerCase() === mergeTargetInput.toLowerCase()
    );

    if (targetTag) {
      // Update target count
      const updatedTags = tags.map(t => {
        if (t.id === targetTag.id) {
          return { ...t, count: t.count + mergeSource.count };
        }
        return t;
      }).filter(t => t.id !== mergeSource.id); // Remove source
      
      setTags(updatedTags);
      setMergeSource(null);
      setMergeTargetInput('');
    } else {
      alert('Target tag not found. Please type an existing tag name exactly.');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      setTags(tags.filter(t => t.id !== id));
    }
  };

  const getTabIcon = (tab: TagCategory) => {
    switch (tab) {
      case 'games': return <Gamepad2 className="w-4 h-4" />;
      case 'software': return <Monitor className="w-4 h-4" />;
      case 'styles': return <Palette className="w-4 h-4" />;
      case 'characters': return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Tag className="w-6 h-6 text-cyan-400" />
            Tag & Metadata Master
          </h2>
          <p className="text-slate-400 text-sm">Manage global taxonomy, merge duplicates, and control user-generated tags.</p>
        </div>

        {/* Add on the Fly Setting */}
        <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">User Creation</span>
            <span className="text-xs text-slate-500">Allow users to add new tags?</span>
          </div>
          <button 
            onClick={() => setAllowUserCreation(!allowUserCreation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${allowUserCreation ? 'bg-cyan-500' : 'bg-slate-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${allowUserCreation ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-1">
        {(['games', 'software', 'styles', 'characters'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-t-lg transition-colors relative ${
              activeTab === tab 
                ? 'text-cyan-400 bg-slate-900/50 border-b-2 border-cyan-500' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
            }`}
          >
            {getTabIcon(tab)}
            <span className="capitalize">{tab}</span>
            {activeTab === tab && (
              <span className="absolute inset-0 bg-cyan-500/5 rounded-t-lg"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tag List */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Controls */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="New Tag Name"
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button 
                onClick={handleAddTag}
                className="bg-cyan-500 hover:bg-cyan-600 text-white p-2.5 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-950 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tag Name</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Usage</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredTags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white">{tag.name}</span>
                            {tag.count > 1000 && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Trending
                              </span>
                            )}
                          </div>
                          {tag.aliases && tag.aliases.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {tag.aliases.map(alias => (
                                <span key={alias} className="text-[10px] text-slate-500 bg-slate-800 px-1.5 rounded">
                                  {alias}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm text-slate-400 font-mono">{tag.count.toLocaleString()}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(tag)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors"
                            title="Edit Aliases"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleMerge(tag)}
                            className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-md transition-colors"
                            title="Merge into another tag"
                          >
                            <GitMerge className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(tag.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                            title="Delete tag"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredTags.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-500">
                        No tags found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Merge Tool & Stats */}
        <div className="space-y-6">
          
          {/* Edit / Merge Tool Panel */}
          <div className={`bg-slate-900 border rounded-xl p-6 transition-all ${mergeSource || editingTag ? 'border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-800'}`}>
            
            {editingTag ? (
              // EDIT MODE
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-cyan-400" />
                  Edit Tag Aliases
                </h3>
                
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 mb-4">
                  <span className="text-xs text-slate-500 block mb-1">Main Tag</span>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-lg">{editingTag.name}</span>
                    <span className="text-xs text-slate-500">{editingTag.count} uses</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-500 block mb-2">Current Aliases</label>
                  <div className="flex flex-wrap gap-2">
                    {editingTag.aliases && editingTag.aliases.length > 0 ? (
                      editingTag.aliases.map(alias => (
                        <span key={alias} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-xs font-medium text-cyan-400 rounded-md border border-slate-700">
                          {alias}
                          <button onClick={() => removeAlias(alias)} className="hover:text-white transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-600 italic">No aliases added yet.</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-500 block mb-2">Add New Alias</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newAliasInput}
                      onChange={(e) => setNewAliasInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addAlias()}
                      placeholder="e.g. CS:GO"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    />
                    <button 
                      onClick={addAlias}
                      className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg transition-colors border border-slate-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">
                    Users searching for these aliases will be redirected to <strong>{editingTag.name}</strong>.
                  </p>
                </div>

                <button 
                  onClick={() => setEditingTag(null)}
                  className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Done
                </button>
              </div>
            ) : (
              // MERGE MODE (or Default)
              <>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <GitMerge className={`w-5 h-5 ${mergeSource ? 'text-purple-400' : 'text-slate-500'}`} />
                  Merge Tool
                </h3>
                
                {mergeSource ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-xs text-slate-500 block mb-1">Source Tag (Will be deleted)</span>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-red-400">{mergeSource.name}</span>
                        <span className="text-xs text-slate-500">{mergeSource.count} uses</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-slate-800 p-1.5 rounded-full">
                        <div className="w-0.5 h-4 bg-slate-600 mx-auto mb-1"></div>
                        <div className="w-2 h-2 border-b-2 border-r-2 border-slate-600 rotate-45 mx-auto"></div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 block mb-2">Merge into (Target Tag)</label>
                      <input 
                        type="text" 
                        value={mergeTargetInput}
                        onChange={(e) => setMergeTargetInput(e.target.value)}
                        placeholder="Type exact target tag name..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-2">
                        All {mergeSource.count} artworks will be re-tagged with the target.
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => setMergeSource(null)}
                        className="flex-1 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={confirmMerge}
                        className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-purple-500/20"
                      >
                        Confirm Merge
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p className="text-sm">Select a tag from the list to edit aliases or merge.</p>
                    <p className="text-xs mt-2 opacity-60">
                      <span className="inline-flex items-center gap-1"><Edit className="w-3 h-3" /> Edit Aliases</span>
                      <span className="mx-2">|</span>
                      <span className="inline-flex items-center gap-1"><GitMerge className="w-3 h-3" /> Merge Duplicates</span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Category Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Total {activeTab}</span>
                <span className="font-mono text-white">{tags.filter(t => t.category === activeTab).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Total Usage</span>
                <span className="font-mono text-cyan-400">
                  {tags.filter(t => t.category === activeTab).reduce((acc, curr) => acc + curr.count, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div className="text-xs text-blue-200">
              <p className="font-bold mb-1">Autocomplete Logic</p>
              <p className="opacity-80">
                Frontend requests to Cloudflare Workers will query the D1 Metadata table for tags starting with the user's input in the '{activeTab}' category.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
