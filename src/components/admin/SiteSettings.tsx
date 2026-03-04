import React, { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Shield, Globe, ShoppingCart, Zap, AlertTriangle, DollarSign } from 'lucide-react';

// Mock Data
const mockSettings = [
  { id: 'marketplace', label: 'Marketplace', description: 'Enable/Disable the entire marketplace functionality.', active: true, icon: <ShoppingCart className="w-5 h-5 text-emerald-400" /> },
  { id: 'splitter', label: 'Background Splitter', description: 'Allow users to access the AI background removal tool.', active: true, icon: <Zap className="w-5 h-5 text-cyan-400" /> },
  { id: 'maintenance', label: 'Maintenance Mode', description: 'Put the site into maintenance mode. Only admins can access.', active: false, icon: <AlertTriangle className="w-5 h-5 text-yellow-400" /> },
  { id: 'registrations', label: 'User Registrations', description: 'Allow new users to sign up.', active: true, icon: <Globe className="w-5 h-5 text-blue-400" /> },
  { id: 'payouts', label: 'Automated Payouts', description: 'Enable automatic processing of creator payouts.', active: false, icon: <DollarSign className="w-5 h-5 text-purple-400" /> },
  { id: 'moderation', label: 'Auto-Moderation', description: 'Use AI to pre-screen uploaded artworks.', active: true, icon: <Shield className="w-5 h-5 text-red-400" /> },
];

export default function SiteSettings() {
  const [settings, setSettings] = useState(mockSettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-400" /> Site Settings (Flags)
        </h2>
        <p className="text-slate-400 text-sm">Control global site features and availability instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((setting) => (
          <div 
            key={setting.id} 
            className={`bg-slate-900/60 backdrop-blur-xl border ${setting.active ? 'border-cyan-500/20' : 'border-slate-800'} rounded-xl p-6 flex items-start justify-between transition-all hover:border-cyan-500/40 group`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${setting.active ? 'bg-slate-800' : 'bg-slate-950'} border border-slate-700 transition-colors`}>
                {setting.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{setting.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{setting.description}</p>
              </div>
            </div>
            
            <button 
              onClick={() => toggleSetting(setting.id)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${setting.active ? 'bg-cyan-500' : 'bg-slate-700'}`}
            >
              <span className="sr-only">Toggle {setting.label}</span>
              <span
                className={`${
                  setting.active ? 'translate-x-7' : 'translate-x-1'
                } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-md`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-start gap-4 mt-8">
        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-yellow-400 font-bold text-lg mb-1">Critical Zone</h4>
          <p className="text-yellow-200/70 text-sm mb-4">
            These settings affect the entire platform immediately. Changes here are logged in the Audit Trail.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-[0_0_10px_rgba(239,68,68,0.3)]">
            Flush Cache & Restart Services
          </button>
        </div>
      </div>
    </div>
  );
}
