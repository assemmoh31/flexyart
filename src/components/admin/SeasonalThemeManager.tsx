import React, { useState } from 'react';
import { Calendar, Clock, Save, Check, Ghost, TreePine, Monitor, Heart } from 'lucide-react';
import { useTheme, SeasonalTheme } from '../../context/ThemeContext';

export default function SeasonalThemeManager() {
  const { theme, setTheme, startDate, setStartDate, endDate, setEndDate, saveThemeSettings, activeTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveThemeSettings();
      showToast('Seasonal theme settings saved successfully!', 'success');
    } catch (error) {
      showToast('Failed to save settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const themes: { id: SeasonalTheme, name: string, icon: React.ReactNode, color: string, bg: string, preview?: React.ReactNode }[] = [
    { id: 'default', name: 'Default', icon: <Monitor className="w-6 h-6" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
    { 
      id: 'halloween', 
      name: 'Halloween', 
      icon: <Ghost className="w-6 h-6" />, 
      color: 'text-orange-500', 
      bg: 'bg-orange-500/10 border-orange-500/30',
      preview: (
        <div className="mt-4 p-3 rounded-lg bg-[#121212] border border-[#FF7518]/30 relative overflow-hidden h-24">
          <div className="absolute inset-0 bg-[url('https://assets.mixkit.co/videos/preview/mixkit-bats-flying-in-the-dark-night-sky-32660-large.mp4')] opacity-20 bg-cover"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#32CD32]/20 to-transparent blur-sm"></div>
          <div className="absolute bottom-2 left-2 animate-pulse" style={{ filter: 'drop-shadow(0 0 5px #32CD32)' }}>
            <Ghost className="w-5 h-5 text-[#FF7518]" />
          </div>
          <div className="absolute bottom-2 right-2 animate-pulse" style={{ filter: 'drop-shadow(0 0 5px #32CD32)' }}>
            <Ghost className="w-5 h-5 text-[#FF7518]" />
          </div>
        </div>
      )
    },
    { 
      id: 'christmas', 
      name: 'Christmas', 
      icon: <TreePine className="w-6 h-6" />, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      preview: (
        <div className="mt-4 p-3 rounded-lg bg-[#0A0E14] border border-[#A5F3FC]/30 relative overflow-hidden h-24">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full shadow-[0_0_5px_#fff]"></div>
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_#fff]"></div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-gradient-to-r from-[#EF4444] via-[#22c55e] to-[#3b82f6]"></div>
        </div>
      )
    },
    { 
      id: 'valentine', 
      name: 'Valentine\'s', 
      icon: <Heart className="w-6 h-6" />, 
      color: 'text-pink-400', 
      bg: 'bg-pink-500/10 border-pink-500/30',
      preview: (
        <div className="mt-4 p-3 rounded-[24px] bg-[#2D1B2D] border-2 border-dashed border-[#F48FB1]/30 relative overflow-hidden h-24 shadow-[0_10px_20px_rgba(244,143,177,0.15)]">
          <div className="absolute inset-0 bg-[#2D1B2D]/80 backdrop-blur-md"></div>
          <div className="absolute bottom-2 left-4 animate-[float-up_3s_linear_infinite]">
            <Heart className="w-4 h-4 text-[#F48FB1] fill-current opacity-50" />
          </div>
          <div className="absolute bottom-4 right-6 animate-[float-up_4s_linear_infinite_1s]">
            <Heart className="w-6 h-6 text-[#F48FB1] fill-current opacity-30" />
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-8 relative max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top-5 ${toast.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          <Check className="w-5 h-5" />
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Seasonal Theme Manager</h2>
        <p className="text-slate-400">Schedule global website transformations based on the time of year.</p>
      </div>

      {/* Current Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Currently Active Theme</h3>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${activeTheme === 'default' ? 'bg-cyan-500' : activeTheme === 'halloween' ? 'bg-orange-500' : 'bg-emerald-500'} animate-pulse`}></div>
            <span className="text-2xl font-bold text-white capitalize">{activeTheme}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400 mb-1">Automatic Reversion</div>
          <div className="text-white font-medium flex items-center gap-2 justify-end">
            <Clock className="w-4 h-4 text-slate-500" />
            {activeTheme !== 'default' ? `Ends on ${new Date(endDate).toLocaleDateString()}` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Select Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                theme === t.id 
                  ? `${t.bg} scale-[1.02] shadow-lg` 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {theme === t.id && (
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${t.color.replace('text-', 'bg-').replace('400', '500').replace('500', '500')} text-white`}>
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-slate-900 border border-slate-800 ${t.color}`}>
                {t.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{t.name}</h4>
              <p className="text-sm text-slate-400">
                {t.id === 'default' && 'The standard dark slate and neon aesthetic.'}
                {t.id === 'halloween' && 'Deep charcoal, pumpkin orange, and slime green with spooky effects.'}
                {t.id === 'christmas' && 'Snowy whites, festive reds, and pine greens.'}
              </p>
              {t.preview}
            </button>
          ))}
        </div>
      </div>

      {/* Scheduling Logic */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" /> Scheduling Logic
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">End Date (Auto-Revert)</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          The website will automatically switch to the selected theme on the Start Date and revert to the 'Default' theme when the End Date passes.
        </p>
      </div>

      {/* Save Action */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Schedule & Theme
        </button>
      </div>
    </div>
  );
}
