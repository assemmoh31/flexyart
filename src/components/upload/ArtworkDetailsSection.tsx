import React, { useState } from 'react';
import { Link, X } from 'lucide-react';

interface ArtworkDetailsProps {
  gameName: string;
  setGameName: (value: string) => void;
  characterName: string;
  setCharacterName: (value: string) => void;
  steamBackground: string;
  setSteamBackground: (value: string) => void;
  softwareUsed: string[];
  setSoftwareUsed: (value: string[]) => void;
  styleTags: string[];
  setStyleTags: (value: string[]) => void;
}

export default function ArtworkDetailsSection({
  gameName, setGameName,
  characterName, setCharacterName,
  steamBackground, setSteamBackground,
  softwareUsed, setSoftwareUsed,
  styleTags, setStyleTags
}: ArtworkDetailsProps) {
  const [currentStyleTag, setCurrentStyleTag] = useState('');

  const softwareOptions = ['After Effects', 'Blender', 'Photoshop', 'Cinema4D'];

  const toggleSoftware = (software: string) => {
    if (softwareUsed.includes(software)) {
      setSoftwareUsed(softwareUsed.filter(s => s !== software));
    } else {
      setSoftwareUsed([...softwareUsed, software]);
    }
  };

  const handleStyleTagKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && currentStyleTag.trim()) {
      e.preventDefault();
      if (!styleTags.includes(currentStyleTag.trim())) {
        setStyleTags([...styleTags, currentStyleTag.trim()]);
      }
      setCurrentStyleTag('');
    }
  };

  const removeStyleTag = (tag: string) => {
    setStyleTags(styleTags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-800">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
        Artwork Details & Categorization
      </h3>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Game Name</label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Game Name"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Character Name</label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Character Name"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Full-Width Input */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Steam Background</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="w-4 h-4 text-slate-500" />
          </div>
          <input
            type="text"
            value={steamBackground}
            onChange={(e) => setSteamBackground(e.target.value)}
            placeholder="Steam Background Name"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Interactive Tags: Software Used */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Software Used</label>
        <div className="flex flex-wrap gap-2">
          {softwareOptions.map(software => (
            <button
              key={software}
              onClick={() => toggleSoftware(software)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                softwareUsed.includes(software)
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {software}
            </button>
          ))}
        </div>
      </div>

      {/* Style Tags */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Style Tags</label>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-colors">
          <div className="flex flex-wrap gap-2 mb-2">
            {styleTags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-xs font-medium text-purple-400 rounded-md">
                {tag}
                <button onClick={() => removeStyleTag(tag)} className="hover:text-white"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={currentStyleTag}
            onChange={(e) => setCurrentStyleTag(e.target.value)}
            onKeyDown={handleStyleTagKeyDown}
            placeholder={styleTags.length === 0 ? "Type & press Space..." : ""}
            className="w-full bg-transparent border-none text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-0 p-0"
          />
        </div>
      </div>

      {/* Disclaimer Text */}
      <p className="text-xs text-slate-500 italic">
        Note: Content featuring game characters will be tagged as Fan Art.
      </p>
    </div>
  );
}
