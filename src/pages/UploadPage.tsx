import React, { useState, useRef } from 'react';
import { Upload, X, Check, FileVideo, File, AlertCircle, Info, DollarSign } from 'lucide-react';

export default function UploadPage() {
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedColor, setSelectedColor] = useState('#22d3ee'); // Default cyan
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [isAI, setIsAI] = useState(false);
  
  const previewInputRef = useRef<HTMLInputElement>(null);
  const sourceInputRef = useRef<HTMLInputElement>(null);

  const colors = [
    '#22d3ee', // Cyan
    '#a855f7', // Purple
    '#ef4444', // Red
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#3b82f6', // Blue
    '#ffffff', // White
  ];

  const handlePreviewDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'video/webm') {
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePreviewSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'video/webm') {
      setPreviewFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSourceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSourceFile(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const isPriceValid = !isPaid || (parseFloat(price) >= 2.50);
  const isFormValid = title && previewFile && sourceFile && isPriceValid;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Your Artwork</h1>
          <p className="text-slate-400">Share your creations with the FlexyArt community.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: File Uploads */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Preview File Upload (.webm) */}
            <div 
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden group
                ${previewFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-900'}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handlePreviewDrop}
            >
              <input 
                type="file" 
                ref={previewInputRef}
                accept="video/webm" 
                className="hidden" 
                onChange={handlePreviewSelect}
              />
              
              {previewUrl ? (
                <div className="relative aspect-video w-full bg-black">
                  <video 
                    src={previewUrl} 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full h-full object-contain"
                  />
                  <button 
                    onClick={() => { setPreviewFile(null); setPreviewUrl(null); }}
                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-200">Preview Ready</span>
                  </div>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center justify-center py-20 cursor-pointer"
                  onClick={() => previewInputRef.current?.click()}
                >
                  <div className="w-16 h-16 mb-4 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileVideo className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">Upload Preview</h3>
                  <p className="text-sm text-slate-400 mb-4">Drag & drop or click to browse</p>
                  <span className="px-3 py-1 text-xs font-medium text-slate-500 bg-slate-800 rounded-full border border-slate-700">
                    .WEBM only (Max 10MB)
                  </span>
                </div>
              )}
            </div>

            {/* Source File Upload */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <File className="w-4 h-4 text-purple-400" />
                Source File
              </h3>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => sourceInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors text-sm font-medium text-slate-300 hover:text-white"
                >
                  {sourceFile ? 'Change File' : 'Select Main File'}
                </button>
                <input 
                  type="file" 
                  ref={sourceInputRef}
                  className="hidden" 
                  onChange={handleSourceSelect}
                />
                {sourceFile ? (
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium text-white truncate">{sourceFile.name}</span>
                      <span className="text-xs text-slate-400">{(sourceFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 text-sm text-slate-500 italic">
                    No file selected (ZIP, RAR, PSD allowed)
                  </div>
                )}
              </div>
            </div>

            {/* AI Disclosure */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isAI ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'}`}>
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">AI Disclosure</h3>
                  <p className="text-xs text-slate-400">Was this artwork created using AI tools?</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAI(!isAI)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${isAI ? 'bg-purple-500' : 'bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAI ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

          </div>

          {/* Right Column: Metadata */}
          <div className="space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 sticky top-24">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cyberpunk Neon City"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Tell us about your artwork..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Tags
                </label>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-colors">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-xs font-medium text-cyan-400 rounded-md">
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-white"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder={tags.length === 0 ? "Type tag & press Enter..." : ""}
                    className="w-full bg-transparent border-none text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-0 p-0"
                  />
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Primary Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${selectedColor === color ? 'ring-2 ring-white scale-110' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-white">Paid Product?</label>
                  <button 
                    onClick={() => setIsPaid(!isPaid)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${isPaid ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPaid ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {isPaid && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-400">€</span>
                      </div>
                      <input 
                        type="number" 
                        step="0.01"
                        min="2.50"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className={`w-full bg-slate-950 border rounded-lg pl-8 pr-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-colors ${!isPriceValid && price ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'}`}
                      />
                    </div>
                    {!isPriceValid && price && (
                      <div className="flex items-start gap-2 text-xs text-red-400">
                        <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>Minimum price is 2.50€ to cover platform fees.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Publish Button */}
              <div className="pt-4">
                <button 
                  disabled={!isFormValid}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform
                    ${isFormValid 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02]' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                >
                  Publish Artwork
                </button>
                {!isFormValid && (
                  <p className="text-center text-xs text-slate-500 mt-3">
                    Please fill in all required fields to publish.
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
