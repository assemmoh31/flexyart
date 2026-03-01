import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HalloweenEffects from './HalloweenEffects';
import ChristmasEffects from './ChristmasEffects';
import ValentineEffects from './ValentineEffects';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30 transition-colors duration-500">
      <HalloweenEffects />
      <ChristmasEffects />
      <ValentineEffects />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
