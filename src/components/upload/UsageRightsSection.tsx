import React, { useEffect } from 'react';
import { Shield, AlertCircle, DollarSign } from 'lucide-react';

interface UsageRightsProps {
  licenseType: string;
  setLicenseType: (val: string) => void;
  commercialPrice: string;
  setCommercialPrice: (val: string) => void;
  isFanArt: boolean;
}

export default function UsageRightsSection({
  licenseType, setLicenseType,
  commercialPrice, setCommercialPrice,
  isFanArt
}: UsageRightsProps) {
  
  // If it's fan art, force personal use
  useEffect(() => {
    if (isFanArt && licenseType !== 'personal') {
      setLicenseType('personal');
    }
  }, [isFanArt, licenseType, setLicenseType]);

  return (
    <div className="space-y-6 pt-6 border-t border-zinc-800">
      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
        <Shield className="w-4 h-4 text-orange-500" />
        Usage Rights & Licensing
      </h3>

      {/* Licensing Dropdown */}
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-2">Select License</label>
        <div className="space-y-3">
          {/* Personal Use */}
          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${licenseType === 'personal' ? 'bg-orange-500/10 border-orange-500/50' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'}`}>
            <input 
              type="radio" 
              name="license" 
              value="personal"
              checked={licenseType === 'personal'}
              onChange={() => setLicenseType('personal')}
              className="mt-1 text-orange-500 focus:ring-orange-500 bg-zinc-950 border-zinc-700"
            />
            <div>
              <div className="text-sm font-bold text-white">Personal Use Only</div>
              <div className="text-xs text-zinc-400 mt-0.5">Buyer can use this on their Steam profile/socials. No resale or commercial use.</div>
            </div>
          </label>

          {/* Creative Commons */}
          <label className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${isFanArt ? 'opacity-50 cursor-not-allowed bg-zinc-900/20 border-zinc-800' : licenseType === 'cc' ? 'bg-orange-500/10 border-orange-500/50 cursor-pointer' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 cursor-pointer'}`}>
            <input 
              type="radio" 
              name="license" 
              value="cc"
              checked={licenseType === 'cc'}
              onChange={() => !isFanArt && setLicenseType('cc')}
              disabled={isFanArt}
              className="mt-1 text-orange-500 focus:ring-orange-500 bg-zinc-950 border-zinc-700 disabled:opacity-50"
            />
            <div>
              <div className="text-sm font-bold text-white">Creative Commons (Free to Share)</div>
              <div className="text-xs text-zinc-400 mt-0.5">Others can share or edit your art with credit (CC BY-NC).</div>
            </div>
          </label>

          {/* Commercial License */}
          <label className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${isFanArt ? 'opacity-50 cursor-not-allowed bg-zinc-900/20 border-zinc-800' : licenseType === 'commercial' ? 'bg-orange-500/10 border-orange-500/50 cursor-pointer' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 cursor-pointer'}`}>
            <input 
              type="radio" 
              name="license" 
              value="commercial"
              checked={licenseType === 'commercial'}
              onChange={() => !isFanArt && setLicenseType('commercial')}
              disabled={isFanArt}
              className="mt-1 text-orange-500 focus:ring-orange-500 bg-zinc-950 border-zinc-700 disabled:opacity-50"
            />
            <div>
              <div className="text-sm font-bold text-white">Commercial License</div>
              <div className="text-xs text-zinc-400 mt-0.5">Allows businesses/streamers to use this in branding for an extra fee.</div>
            </div>
          </label>
        </div>

        {isFanArt && (
          <div className="mt-3 flex items-start gap-2 text-xs text-orange-400 bg-orange-500/10 p-2.5 rounded-lg border border-orange-500/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Note: Fan Art is restricted to Personal Use only to respect copyright.</span>
          </div>
        )}
      </div>

      {/* Commercial Price Field */}
      {licenseType === 'commercial' && !isFanArt && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">Commercial Add-on Price ($)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="w-4 h-4 text-zinc-500" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={commercialPrice}
              onChange={(e) => setCommercialPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Standard License Agreement */}
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-2">Standard License Agreement</label>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 h-32 overflow-y-auto custom-scrollbar text-xs text-zinc-400 space-y-2">
          <ul className="list-disc pl-4 space-y-1.5">
            <li>Non-exclusive, worldwide, perpetual right for personal profile display.</li>
            <li>No right to resell, sub-license, or redistribute as a standalone file.</li>
            <li>No right to use in AI training datasets without explicit artist consent.</li>
            <li>Artist retains all original copyrights and moral rights.</li>
            <li>Sale is final once the digital asset is downloaded.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
