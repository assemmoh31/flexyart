import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Save, Check, Ghost, TreePine, Monitor, Heart, Sun, Umbrella, Flower2, Send, Database, Eye, Settings, Gift, Percent } from 'lucide-react';
import { useTheme, SeasonalTheme } from '../../context/ThemeContext';

export default function EventCommandCenter() {
  const { theme, setTheme, startDate, setStartDate, endDate, setEndDate, saveThemeSettings, activeTheme, isPreviewMode, setIsPreviewMode } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  
  // Event Config State
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1.5);
  const [lootBoxActive, setLootBoxActive] = useState(true);
  const [dropOdds, setDropOdds] = useState(5.0);
  const [isAnnouncing, setIsAnnouncing] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveThemeSettings();
      // Mock D1 Database save
      console.log('Saving to D1 events table:', {
        event_name: `${theme}_event_2026`,
        start_time: startDate,
        end_time: endDate,
        theme_id: theme,
        is_active: true,
        metadata: JSON.stringify({
          currency_multiplier: currencyMultiplier,
          loot_box_active: lootBoxActive,
          drop_odds: dropOdds
        })
      });
      showToast('Event settings saved to D1 database successfully!', 'success');
    } catch (error) {
      showToast('Failed to save settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnnounce = () => {
    setIsAnnouncing(true);
    setTimeout(() => {
      setIsAnnouncing(false);
      showToast('Announcement queued for Discord & Email!', 'success');
    }, 1500);
  };

  const themes: { id: SeasonalTheme, name: string, icon: React.ReactNode, color: string, bg: string, currency: string, preview?: React.ReactNode }[] = [
    { id: 'default', name: 'Default', icon: <Monitor className="w-6 h-6" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30', currency: 'Credits' },
    { id: 'spring', name: 'Spring Bloom', icon: <Flower2 className="w-6 h-6" />, color: 'text-[#81C784]', bg: 'bg-[#81C784]/10 border-[#81C784]/30 shadow-[0_0_15px_rgba(129,199,132,0.3)]', currency: 'Honey',
      preview: (
        <div className="mt-4 p-3 rounded-lg bg-[#0A1A10] border border-[#81C784]/30 relative overflow-hidden h-24">
          <div className="absolute inset-0 bg-gradient-to-t from-[#81C784]/10 to-transparent"></div>
          <div className="absolute top-2 left-4 w-2 h-2 bg-[#FFF176] rounded-full opacity-60 animate-[fall-petal_3s_linear_infinite]"></div>
          <div className="absolute top-0 right-8 w-3 h-3 bg-[#FFF176] rounded-full opacity-40 animate-[fall-petal_4s_linear_infinite_1s]" style={{ borderRadius: '50% 0 50% 50%' }}></div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[#FFF176] text-xs font-bold">
            <Flower2 className="w-3 h-3" /> +Honey
          </div>
        </div>
      )
    },
    { id: 'halloween', name: 'Halloween', icon: <Ghost className="w-6 h-6" />, color: 'text-[#E65100]', bg: 'bg-[#121212] border-[#E65100]/30', currency: 'Candy' },
    { id: 'christmas', name: 'Christmas', icon: <TreePine className="w-6 h-6" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/30', currency: 'Snowballs' },
    { id: 'valentine', name: 'Valentine\'s', icon: <Heart className="w-6 h-6" />, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30', currency: 'Hearts' },
    { id: 'lunar', name: 'Lunar New Year', icon: <Sun className="w-6 h-6" />, color: 'text-yellow-400', bg: 'bg-red-900/40 border-yellow-500/30', currency: 'Coins' },
  ];

  const activeThemeData = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="space-y-6 relative max-w-6xl mx-auto animate-in fade-in duration-500">
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top-5 ${toast.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          <Check className="w-5 h-5" />
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" /> Event Command Center
          </h2>
          <p className="text-slate-400 text-sm">Schedule, preview, and automate seasonal site-wide events.</p>
        </div>
        
        {/* Preview Mode Toggle */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${isPreviewMode ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center gap-2">
            <Eye className={`w-4 h-4 ${isPreviewMode ? 'text-purple-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-bold ${isPreviewMode ? 'text-purple-400' : 'text-slate-400'}`}>Admin Preview Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isPreviewMode} onChange={(e) => setIsPreviewMode(e.target.checked)} className="sr-only peer" />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeline & Theme Selection */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Timeline View (Visual Mock) */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" /> Event Timeline
            </h3>
            <div className="relative h-24 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden p-2 flex items-center">
              {/* Timeline Grid Lines */}
              <div className="absolute inset-0 flex justify-between opacity-10 pointer-events-none">
                {[...Array(12)].map((_, i) => <div key={i} className="w-px h-full bg-white"></div>)}
              </div>
              
              {/* Event Blocks */}
              <div className="relative w-full h-12 flex items-center">
                <div className="absolute left-[10%] w-[15%] h-10 bg-pink-500/20 border border-pink-500/50 rounded-md flex items-center justify-center text-xs font-bold text-pink-400 cursor-grab hover:bg-pink-500/30 transition-colors">
                  Valentine's
                </div>
                <div className="absolute left-[30%] w-[25%] h-10 bg-[#81C784]/20 border border-[#81C784]/50 rounded-md flex items-center justify-center text-xs font-bold text-[#81C784] cursor-grab hover:bg-[#81C784]/30 transition-colors shadow-[0_0_10px_rgba(129,199,132,0.2)]">
                  Spring Bloom
                </div>
                <div className="absolute left-[70%] w-[20%] h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-md flex items-center justify-center text-xs font-bold text-cyan-400 cursor-grab hover:bg-cyan-500/30 transition-colors">
                  Summer Sale
                </div>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Select Theme</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    theme === t.id 
                      ? `${t.bg} scale-[1.02] shadow-lg` 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {theme === t.id && (
                    <div className="absolute top-3 right-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${t.color.replace('text-', 'bg-').replace('400', '500').replace('500', '500')} text-white`}>
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-slate-900 border border-slate-800 ${t.color}`}>
                    {t.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{t.name}</h4>
                  {t.preview}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Configuration & Marketing */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Event Configuration Form */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" /> Configuration
            </h3>
            
            <div className="space-y-5">
              {/* Schedule */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Currency Multiplier */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {activeThemeData.currency} Multiplier
                  </label>
                  <span className="text-cyan-400 font-mono font-bold text-sm">{currencyMultiplier}x</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="5" step="0.1"
                  value={currencyMultiplier}
                  onChange={(e) => setCurrencyMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Users earn {currencyMultiplier} {activeThemeData.currency} per $1 spent.</p>
              </div>

              {/* Loot Box Settings */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-bold text-white">Event Cases</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={lootBoxActive} onChange={(e) => setLootBoxActive(e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                
                {lootBoxActive && (
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Percent className="w-3 h-3" /> Elite Drop Odds
                    </label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={dropOdds}
                        onChange={(e) => setDropOdds(parseFloat(e.target.value) || 0)}
                        className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm font-mono focus:border-purple-500 focus:outline-none"
                      />
                      <span className="text-slate-500 text-sm">%</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Achievement Badge Logic */}
              {theme === 'spring' && (
                <div className="p-3 bg-[#81C784]/10 border border-[#81C784]/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Flower2 className="w-4 h-4 text-[#81C784]" />
                    <span className="text-sm font-bold text-[#81C784]">"Gardener" Badge Active</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Awarded to artists uploading 3+ artworks during this event.</p>
                </div>
              )}
            </div>
          </div>

          {/* Automated Marketing Hooks */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" /> Marketing Hooks
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Automatically announce the "{activeThemeData.name}" event to Discord and Email subscribers when it goes live.
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg mb-4 text-xs text-slate-300 font-mono">
              "The {activeThemeData.name} event has started! Collect {activeThemeData.currency} and unlock exclusive rewards!"
            </div>
            <button 
              onClick={handleAnnounce}
              disabled={isAnnouncing}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] disabled:opacity-50"
            >
              {isAnnouncing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Test & Queue Announcements
            </button>
          </div>

          {/* Save Action */}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            Save Event to D1 Database
          </button>

        </div>
      </div>
    </div>
  );
}
