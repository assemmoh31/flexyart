import { LayoutTemplate } from 'lucide-react';
import ThemesDiscovery from '../components/ThemesDiscovery';

export default function Themes() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400 mb-6">
            <LayoutTemplate className="h-4 w-4" />
            <span>Complete Profile Overhauls</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Profile Themes</h1>
        </div>
      </div>

      <ThemesDiscovery />
      
      <div className="mt-20 text-center">
        <button className="rounded-full border border-slate-700 bg-slate-900 px-8 py-4 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          Load More Themes
        </button>
      </div>
    </div>
  );
}
