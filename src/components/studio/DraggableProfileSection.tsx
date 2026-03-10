import React from 'react';
import { Reorder, useDragControls } from 'motion/react';
import { GripVertical, Eye, EyeOff, Settings } from 'lucide-react';

interface DraggableProfileSectionProps {
  key?: React.Key;
  item: any;
  isActive: boolean;
  onToggleVisibility: (id: string) => void;
  onSettingsClick: (id: string) => void;
  children: React.ReactNode;
}

const DraggableProfileSection: React.FC<DraggableProfileSectionProps> = ({
  item,
  isActive,
  onToggleVisibility,
  onSettingsClick,
  children
}) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragListener={false}
      dragControls={controls}
      className={`relative mb-6 rounded-2xl border transition-all duration-300 ${
        isActive ? 'border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-slate-800 hover:border-slate-700'
      } ${!item.isVisible ? 'opacity-50 grayscale' : ''}`}
    >
      {/* Section Controls (Top Bar) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 shadow-xl z-10 backdrop-blur-md">
        <div 
          className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-cyan-400 transition-colors"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</span>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <button 
          onClick={() => onToggleVisibility(item.id)}
          className="p-1 text-slate-400 hover:text-white transition-colors"
          title={item.isVisible ? "Hide Section" : "Show Section"}
        >
          {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button 
          onClick={() => onSettingsClick(item.id)}
          className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
          title="Section Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Section Content */}
      <div className="bg-[#121212]/80 backdrop-blur-[16px] rounded-2xl overflow-hidden min-h-[100px] p-6 pt-8">
        {children}
      </div>
    </Reorder.Item>
  );
};

export default DraggableProfileSection;
