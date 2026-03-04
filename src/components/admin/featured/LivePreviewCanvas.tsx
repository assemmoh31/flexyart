import React from 'react';
import { MoreVertical, Trash2, Clock, Eye, MousePointer2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockPreviewData = [
  { id: 1, title: 'Neon City', artist: 'NeonDreams', image: 'https://picsum.photos/seed/neon/300/200', views: 1200, clicks: 450 },
  { id: 2, title: 'Abstract Flow', artist: 'FlowMaster', image: 'https://picsum.photos/seed/abstract/300/200', views: 980, clicks: 320 },
  { id: 3, title: 'Cyber Samurai', artist: 'CyberArtist_X', image: 'https://picsum.photos/seed/cyber/300/200', views: 1500, clicks: 600 },
  { id: 4, title: 'Retro Wave', artist: 'RetroKing', image: 'https://picsum.photos/seed/retro/300/200', views: 800, clicks: 200 },
  { id: 5, title: 'Space Dust', artist: 'SpaceCadet', image: 'https://picsum.photos/seed/space/300/200', views: 1100, clicks: 400 },
  { id: 6, title: 'Pixel Art', artist: 'PixelMaster', image: 'https://picsum.photos/seed/pixel/300/200', views: 600, clicks: 150 },
];

export default function LivePreviewCanvas() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-6 h-full shadow-xl flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" /> Live Homepage Preview
        </h3>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Updates
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-2">
        {mockPreviewData.map((item) => (
          <div key={item.id} className="group relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              
              {/* Overlay Actions */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1.5 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-cyan-500 hover:text-white transition-colors" title="Extend Time">
                  <Clock className="w-4 h-4" />
                </button>
                <button className="p-1.5 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 hover:text-white transition-colors" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-white font-bold truncate">{item.title}</h4>
                <p className="text-xs text-slate-400">@{item.artist}</p>
              </div>
            </div>

            {/* Analytics Mini-Chart */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800">
              <div className="flex justify-between items-center mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Performance</span>
                <span className="text-cyan-400">{(item.clicks / item.views * 100).toFixed(1)}% CTR</span>
              </div>
              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Views', value: item.views },
                    { name: 'Clicks', value: item.clicks }
                  ]}>
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', fontSize: '10px', padding: '4px 8px' }}
                    />
                    <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {item.views}
                </div>
                <div className="flex items-center gap-1">
                  <MousePointer2 className="w-3 h-3" /> {item.clicks}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
