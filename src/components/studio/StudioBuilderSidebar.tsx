import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutTemplate, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Monitor, 
  Smartphone,
  Layers,
  Grid,
  Columns,
  Maximize,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

interface StudioBuilderSidebarProps {
  sections: any[];
  onReorder: (newOrder: any[]) => void;
  onToggleVisibility: (id: string) => void;
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
  previewMode: 'desktop' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
  themeSettings: any;
  setThemeSettings: (settings: any) => void;
  onSave: () => void;
}

export default function StudioBuilderSidebar({
  sections,
  onReorder,
  onToggleVisibility,
  activeSection,
  setActiveSection,
  previewMode,
  setPreviewMode,
  themeSettings,
  setThemeSettings,
  onSave
}: StudioBuilderSidebarProps) {
  const [activeTab, setActiveTab] = useState<'layout' | 'theme'>('layout');
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection && settingsRef.current) {
      settingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  return (
    <aside className="w-80 bg-[#121212]/95 backdrop-blur-[16px] border-r border-slate-800 flex flex-col h-full z-20 shrink-0 shadow-2xl">
      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('layout')}
          className={`flex-1 py-3 text-sm font-bold transition-colors border-b-2 ${activeTab === 'layout' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Layout
        </button>
        <button 
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-3 text-sm font-bold transition-colors border-b-2 ${activeTab === 'theme' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Theme
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" /> Active Blocks
              </h3>
              <p className="text-xs text-slate-500 mb-4">Drag sections in the preview area to reorder them.</p>
              
              <div className="space-y-2">
                {sections.map(section => (
                  <div 
                    key={section.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${activeSection === section.id ? 'bg-cyan-500/10 border-cyan-500/50 text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="font-medium text-sm">{section.title}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleVisibility(section.id); }}
                      className={`p-1.5 rounded-md transition-colors ${section.isVisible ? 'text-cyan-400 hover:bg-cyan-500/20' : 'text-slate-500 hover:bg-slate-800'}`}
                    >
                      {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Section Settings */}
            {activeSection && (
              <div ref={settingsRef} className="border-t border-slate-800 pt-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  {sections.find(s => s.id === activeSection)?.title} Settings
                </h3>
                
                {activeSection === 'shop' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Gallery Layout</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['grid', 'masonry', 'carousel'].map(layout => (
                          <button 
                            key={layout}
                            onClick={() => setThemeSettings({...themeSettings, shopLayout: layout})}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors ${themeSettings.shopLayout === layout ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                          >
                            {layout === 'grid' && <Grid className="w-4 h-4" />}
                            {layout === 'masonry' && <Columns className="w-4 h-4" />}
                            {layout === 'carousel' && <Maximize className="w-4 h-4" />}
                            <span className="text-[10px] uppercase">{layout}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500" defaultChecked />
                        Show Pinned/Featured Row
                      </label>
                    </div>
                  </div>
                )}
                
                {activeSection === 'hero' && (
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500" defaultChecked />
                        Enable Promo Banner
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Promo Text</label>
                      <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" defaultValue="🔥 50% OFF ALL ANIMATED AVATARS THIS WEEKEND!" />
                    </div>
                  </div>
                )}

                {activeSection === 'process' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Media Type</label>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setThemeSettings({...themeSettings, processType: 'static'})}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${themeSettings.processType === 'static' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          Static
                        </button>
                        <button 
                          onClick={() => setThemeSettings({...themeSettings, processType: 'animated'})}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${themeSettings.processType === 'animated' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          Animated
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Before Media ({themeSettings.processType === 'animated' ? '.webm' : '.png, .jpg'})</label>
                      <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-lg p-4 text-center cursor-pointer transition-colors bg-slate-900/50 relative overflow-hidden">
                        <input 
                          type="file" 
                          accept={themeSettings.processType === 'animated' ? 'video/webm' : 'image/png, image/jpeg'} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setThemeSettings({...themeSettings, processBeforeMedia: URL.createObjectURL(file)});
                            }
                          }}
                        />
                        <ImageIcon className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                        <span className="text-xs text-slate-400">Upload Before Media</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">After Media ({themeSettings.processType === 'animated' ? '.webm' : '.png, .jpg'})</label>
                      <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-lg p-4 text-center cursor-pointer transition-colors bg-slate-900/50 relative overflow-hidden">
                        <input 
                          type="file" 
                          accept={themeSettings.processType === 'animated' ? 'video/webm' : 'image/png, image/jpeg'} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setThemeSettings({...themeSettings, processAfterMedia: URL.createObjectURL(file)});
                            }
                          }}
                        />
                        <ImageIcon className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                        <span className="text-xs text-slate-400">Upload After Media</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-6">
            {/* Custom Palette */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-slate-400" /> Custom Palette
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {['#06b6d4', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#6366f1', '#14b8a6', '#f43f5e'].map(color => (
                  <button 
                    key={color}
                    onClick={() => setThemeSettings({...themeSettings, primaryColor: color})}
                    className={`w-full aspect-square rounded-full border-2 transition-transform hover:scale-110 ${themeSettings.primaryColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Type className="w-4 h-4 text-slate-400" /> Typography
              </h3>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                value={themeSettings.fontFamily}
                onChange={(e) => setThemeSettings({...themeSettings, fontFamily: e.target.value})}
              >
                <option value="Inter">Inter (Modern Sans)</option>
                <option value="Space Grotesk">Space Grotesk (Tech)</option>
                <option value="Playfair Display">Playfair Display (Editorial)</option>
                <option value="JetBrains Mono">JetBrains Mono (Code)</option>
              </select>
            </div>

            {/* Backgrounds */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Backgrounds
              </h3>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-lg p-4 text-center cursor-pointer transition-colors bg-slate-900/50">
                  <ImageIcon className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <span className="text-xs text-slate-400">Upload Profile Banner</span>
                </div>
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-lg p-4 text-center cursor-pointer transition-colors bg-slate-900/50">
                  <ImageIcon className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <span className="text-xs text-slate-400">Upload Page Background</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={onSave}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save & Publish
        </button>
      </div>
    </aside>
  );
}
