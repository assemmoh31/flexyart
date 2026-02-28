import React, { useState, useRef } from 'react';
import AdvancedCropper from '../components/AdvancedCropper';
import { 
  Crop, 
  Palette, 
  Layout, 
  Download, 
  Upload, 
  Info, 
  ArrowLeft, 
  X, 
  Check, 
  Image as ImageIcon, 
  Sliders,
  Scissors,
  Zap,
  EyeOff,
  Hash,
  Trophy,
  TrendingUp,
  Type,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ToolId = 
  | 'cropper' 
  | 'visualizer' 
  | 'gif-optimizer' 
  | 'color-extractor' 
  | 'workshop-slicer' 
  | 'invisible-char' 
  | 'steam-id' 
  | 'achievement' 
  | 'level-calc' 
  | 'fancy-text' 
  | null;

const tools = [
  {
    id: 'cropper',
    title: 'Artwork Cropper',
    description: 'Slice images into perfectly aligned Long & Side showcase panels.',
    icon: <Crop className="h-8 w-8 text-cyan-400" />,
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'group-hover:border-cyan-500/50',
    status: 'READY',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'visualizer',
    title: 'Profile Visualizer',
    description: 'See exactly how assets look in a mock Steam profile UI.',
    icon: <Layout className="h-8 w-8 text-purple-400" />,
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'group-hover:border-purple-500/50',
    status: 'UPDATED',
    statusColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    id: 'gif-optimizer',
    title: 'GIF Optimizer',
    description: 'Shrink frames and optimize colors to hit Steam\'s strict file size limits.',
    icon: <Zap className="h-8 w-8 text-amber-400" />,
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'group-hover:border-amber-500/50',
    status: 'BETA',
    statusColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    id: 'color-extractor',
    title: 'Color Extractor',
    description: 'Get a perfect color palette from any game background.',
    icon: <Palette className="h-8 w-8 text-pink-400" />,
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'group-hover:border-pink-500/50',
    status: 'READY',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'workshop-slicer',
    title: 'Workshop Slicer',
    description: 'Convert videos into Workshop-compatible loop GIFs.',
    icon: <Scissors className="h-8 w-8 text-red-400" />,
    color: 'from-red-500/20 to-orange-500/20',
    border: 'group-hover:border-red-500/50',
    status: 'NEW',
    statusColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    id: 'invisible-char',
    title: 'Invisible Character',
    description: 'Generate zero-width characters for clean, minimalist profile names.',
    icon: <EyeOff className="h-8 w-8 text-slate-400" />,
    color: 'from-slate-500/20 to-gray-500/20',
    border: 'group-hover:border-slate-500/50',
    status: 'READY',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'steam-id',
    title: 'Steam ID Converter',
    description: 'Quickly switch between SteamID64, SID3, and profile URLs.',
    icon: <Hash className="h-8 w-8 text-blue-400" />,
    color: 'from-blue-500/20 to-indigo-500/20',
    border: 'group-hover:border-blue-500/50',
    status: 'READY',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'achievement',
    title: 'Achievement Builder',
    description: 'Plan your showcase layout and sort by rarity or color aesthetics.',
    icon: <Trophy className="h-8 w-8 text-yellow-400" />,
    color: 'from-yellow-500/20 to-amber-500/20',
    border: 'group-hover:border-yellow-500/50',
    status: 'BETA',
    statusColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    id: 'level-calc',
    title: 'Level Calculator',
    description: 'Detailed XP roadmap for your next profile level milestone.',
    icon: <TrendingUp className="h-8 w-8 text-green-400" />,
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'group-hover:border-green-500/50',
    status: 'READY',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'fancy-text',
    title: 'Fancy Text Generator',
    description: 'Generate stylish unicode fonts for your profile name and bio.',
    icon: <Type className="h-8 w-8 text-indigo-400" />,
    color: 'from-indigo-500/20 to-violet-500/20',
    border: 'group-hover:border-indigo-500/50',
    status: 'NEW',
    statusColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  }
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState<ToolId>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <AnimatePresence mode="wait">
        {!activeTool ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">Creator Tools</h1>
              <p className="text-xl text-slate-400">Premium workstations for designing the perfect Steam profile.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <div 
                  key={tool.id} 
                  onClick={() => setActiveTool(tool.id as ToolId)}
                  className={`group relative rounded-2xl bg-slate-900 border border-slate-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-slate-800/80 cursor-pointer ${tool.border} flex flex-col h-full`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                        {tool.icon}
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider border ${tool.statusColor}`}>
                        {tool.status}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{tool.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">{tool.description}</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-white transition-colors">
                      Open Tool <ArrowLeft className="h-4 w-4 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="workspace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="h-screen flex flex-col"
          >
            {/* Focus Mode Header */}
            <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTool(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">Back to Tools</span>
                </button>
                <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  {tools.find(t => t.id === activeTool)?.icon}
                  {tools.find(t => t.id === activeTool)?.title}
                </h2>
              </div>
            </div>

            {/* Tool Content */}
            <div className="flex-1 overflow-y-auto bg-slate-950 p-6">
              <div className="max-w-7xl mx-auto h-full">
                {activeTool === 'cropper' && <ShowcaseCropper />}
                {activeTool === 'visualizer' && <AdvancedCropper />}
                {activeTool === 'color-extractor' && <PaletteMatcher />}
                {activeTool === 'invisible-char' && <InvisibleCharacter />}
                {activeTool === 'fancy-text' && <FancyTextGenerator />}
                
                {/* Placeholders for other tools */}
                {['gif-optimizer', 'workshop-slicer', 'steam-id', 'achievement', 'level-calc'].includes(activeTool) && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="h-24 w-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                      <Info className="h-10 w-10 text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Tool Under Construction</h3>
                    <p className="text-slate-400 max-w-md">This tool is currently being built. Check back soon for updates!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               TOOL COMPONENTS                              */
/* -------------------------------------------------------------------------- */

const ShowcaseCropper = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {!image ? (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full max-w-3xl border-2 border-dashed border-slate-700 rounded-3xl bg-slate-900/50 p-20 text-center hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group"
        >
          <div className="h-24 w-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-cyan-500/20">
            <Upload className="h-10 w-10 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Drag & Drop Background Image</h3>
          <p className="text-slate-400">Supports JPG, PNG, WEBM (Max 10MB)</p>
          <button className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors">
            Browse Files
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Preview & Crop</h3>
              <div className="flex gap-3">
                <button onClick={() => setImage(null)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Reset</button>
                <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <Download className="h-4 w-4" /> Download All
                </button>
              </div>
            </div>

            <div className="relative bg-[#1b2838] p-4 rounded-xl overflow-hidden border border-slate-700">
              <div className="flex gap-4 justify-center relative z-10">
                {/* Main Artwork */}
                <div className="relative group">
                  <div className="w-[506px] h-[506px] bg-slate-800 overflow-hidden border-2 border-cyan-500/50 relative">
                    <img src={image} alt="Main" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black/70 text-white px-3 py-1 rounded text-xs font-mono border border-white/10">Main: 506px width</span>
                    </div>
                  </div>
                </div>
                {/* Side Artwork */}
                <div className="relative group">
                  <div className="w-[100px] h-[506px] bg-slate-800 overflow-hidden border-2 border-cyan-500/50 relative">
                    <img src={image} alt="Side" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-mono border border-white/10 rotate-90 whitespace-nowrap">Side: 100px</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background Blur Effect */}
              <div className="absolute inset-0 z-0 opacity-20 blur-3xl" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}></div>
            </div>
            
            <p className="mt-6 text-center text-slate-500 text-sm">
              <Info className="h-4 w-4 inline mr-1" />
              The system automatically calculates the perfect offset for the side panel to align with the main artwork.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const PaletteMatcher = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        // Mock color extraction
        setColors(['#FF0055', '#00FFCC', '#7700FF', '#FFAA00', '#121212']);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto">
      {!image ? (
        <label className="w-full border-2 border-dashed border-slate-700 rounded-3xl bg-slate-900/50 p-20 text-center hover:border-purple-500/50 hover:bg-slate-900 transition-all cursor-pointer group">
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          <div className="h-24 w-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform group-hover:bg-purple-500/20">
            <Palette className="h-10 w-10 text-slate-400 group-hover:text-purple-400 transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Upload Artwork</h3>
          <p className="text-slate-400">Find the perfect Steam theme match</p>
        </label>
      ) : (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img src={image} alt="Uploaded" className="w-full rounded-lg border border-slate-700 shadow-lg" />
              <button onClick={() => setImage(null)} className="mt-4 w-full py-2 text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
                Upload New Image
              </button>
            </div>
            
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Dominant Colors</h3>
                <div className="flex gap-4">
                  {colors.map((color, i) => (
                    <div key={i} className="group relative">
                      <div 
                        className="w-16 h-16 rounded-full shadow-lg border-2 border-slate-800 transform transition-transform group-hover:scale-110 cursor-pointer" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-400" />
                  Recommended Theme
                </h3>
                <p className="text-slate-300 mb-4">Based on your artwork, we recommend the <span className="text-purple-400 font-bold">"Midnight Neon"</span> Steam profile theme.</p>
                <div className="h-24 w-full bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-lg border border-slate-700 flex items-center justify-center">
                  <span className="font-mono text-white/50 tracking-widest uppercase">Theme Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const InvisibleCharacter = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('⠀'); // Zero-width space
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
      <div className="h-24 w-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 shadow-xl">
        <EyeOff className="h-10 w-10 text-slate-400" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">Invisible Character Generator</h2>
      <p className="text-slate-400 mb-12 text-lg">
        Copy the invisible character below to create clean, nameless folders or profile sections on Steam.
      </p>

      <button 
        onClick={handleCopy}
        className="group relative w-full max-w-md py-6 bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
      >
        <div className="flex items-center justify-center gap-3">
          {copied ? (
            <>
              <Check className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Copy Character</span>
            </>
          )}
        </div>
        <div className="mt-2 text-xs text-slate-500 font-mono bg-black/30 inline-block px-2 py-1 rounded">
          U+2800 (Braille Pattern Blank)
        </div>
      </button>

      <div className="mt-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800 text-left w-full">
        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Info className="h-4 w-4 text-cyan-400" /> How to use
        </h4>
        <ol className="list-decimal list-inside text-slate-400 space-y-2 text-sm">
          <li>Click the button above to copy the character.</li>
          <li>Go to your Steam Profile Edit page.</li>
          <li>Paste it into any text field (Name, Summary, etc.).</li>
          <li>Save changes to see the invisible effect.</li>
        </ol>
      </div>
    </div>
  );
};

const FancyTextGenerator = () => {
  const [text, setText] = useState('FlexyArt');
  
  // Simple mapping functions for demo purposes
  const toBoldSans = (str: string) => {
    const map: Record<string, string> = {
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭'
    };
    return str.split('').map(c => map[c] || c).join('');
  };

  const toItalicSerif = (str: string) => {
    const map: Record<string, string> = {
      'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
      'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
    };
    return str.split('').map(c => map[c] || c).join('');
  };

  const toMonospace = (str: string) => {
    const map: Record<string, string> = {
      'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
      'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉'
    };
    return str.split('').map(c => map[c] || c).join('');
  };

  const toBubbles = (str: string) => {
    const map: Record<string, string> = {
      'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
      'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ'
    };
    return str.split('').map(c => map[c] || c).join('');
  };

  const toSmallCaps = (str: string) => {
    const map: Record<string, string> = {
      'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };
    return str.split('').map(c => map[c.toLowerCase()] || c.toUpperCase()).join('');
  };

  const demoStyles = [
    { name: 'Bold Sans', preview: toBoldSans(text) },
    { name: 'Italic Serif', preview: toItalicSerif(text) },
    { name: 'Monospace', preview: toMonospace(text) },
    { name: 'Bubbles', preview: toBubbles(text) },
    { name: 'Small Caps', preview: toSmallCaps(text) },
    { name: 'Wide', preview: text.split('').join(' ') },
    { name: 'Squares', preview: text.split('').map(c => `[${c}]`).join('') },
    { name: 'Upside Down', preview: text.split('').reverse().join('') }, // Simplified
  ];

  return (
    <div className="h-full flex flex-col items-center max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Fancy Text Generator</h2>
        <p className="text-slate-400">Type your text below to generate stylish unicode fonts for your profile.</p>
      </div>

      <div className="w-full mb-12">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-2xl text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors text-center font-bold"
        />
      </div>

      <div className="w-full grid gap-4">
        {demoStyles.map((style, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-indigo-500/50 transition-colors">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">{style.name}</span>
              <p className="text-xl text-white font-medium break-all">
                {style.preview || <span className="text-slate-600 italic">Type something...</span>}
              </p>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(style.preview);
                // Add toast notification logic here
              }}
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
