import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 text-white font-bold text-xl">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Flexy<span className="text-cyan-400">Art</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier marketplace for custom Steam artworks, showcases, and profile themes. Elevate your digital identity.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Marketplace</h3>
            <ul className="space-y-3">
              <li><Link to="/marketplace" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">All Artworks</Link></li>
              <li><Link to="/themes" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Profile Themes</Link></li>
              <li><Link to="/marketplace?category=animated" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Animated Showcases</Link></li>
              <li><Link to="/marketplace?category=static" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Static Artworks</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/tools" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">Creator Tools</Link></li>
              <li><Link to="/pricing" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">Pricing & Plans</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for the latest drops and creator tips.</p>
            <form className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-md border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <button 
                type="submit" 
                className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FlexyArt.com. All rights reserved. Not affiliated with Valve Corporation.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
