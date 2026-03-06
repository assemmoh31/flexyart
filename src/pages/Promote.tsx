import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Check, CreditCard, Wallet, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data
const creatorArtworks = [
  { id: 1, title: "Neon City Lights", image: "https://picsum.photos/seed/art1/300/200", price: "$15.00" },
  { id: 2, title: "Cyberpunk Character", image: "https://picsum.photos/seed/art2/300/200", price: "$25.00" },
  { id: 3, title: "Retro Wave", image: "https://picsum.photos/seed/art4/300/200", price: "$12.00" },
  { id: 4, title: "Abstract Glitch", image: "https://picsum.photos/seed/art3/300/200", price: "$8.50" },
  { id: 5, title: "Space Odyssey", image: "https://picsum.photos/seed/art5/300/200", price: "$20.00" },
];

const userBalance = 450.00;

export default function Promote() {
  const [selectedArtwork, setSelectedArtwork] = useState(creatorArtworks[0]);
  const [selectedPlan, setSelectedPlan] = useState<'flash' | 'mega'>('mega');
  const [paymentMethod, setPaymentMethod] = useState<'credits' | 'direct'>('credits');

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Configuration */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Header */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Boost Your Reach</h1>
            <p className="text-zinc-400 text-lg">
              Get your artwork seen by thousands. Boosted art appears at the top of <span className="text-white font-semibold">'Trending'</span> and <span className="text-white font-semibold">'Search'</span> results.
            </p>
          </div>

          {/* Artwork Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="bg-zinc-800 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Select Artwork
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {creatorArtworks.map((art) => (
                <button
                  key={art.id}
                  onClick={() => setSelectedArtwork(art)}
                  className={`relative flex-shrink-0 w-40 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedArtwork.id === art.id 
                      ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-105' 
                      : 'border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                  {selectedArtwork.id === art.id && (
                    <div className="absolute inset-0 bg-orange-500/10 flex items-center justify-center">
                      <div className="bg-orange-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Boost Plans */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="bg-zinc-800 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Choose Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan A */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan('flash')}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 relative overflow-hidden ${
                  selectedPlan === 'flash' 
                    ? 'border-orange-500 bg-zinc-900/50' 
                    : 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${selectedPlan === 'flash' ? 'bg-orange-500/20 text-orange-500' : 'bg-zinc-800 text-zinc-400'}`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$1.99</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">24-Hour Flash</h3>
                <p className="text-zinc-400 text-sm mb-4">Ideal for new drops and quick visibility.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full w-fit">
                  <Zap className="w-3 h-3 fill-current" /> 🔥 Pulse Badge
                </div>
              </motion.div>

              {/* Plan B */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan('mega')}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 relative overflow-hidden ${
                  selectedPlan === 'mega' 
                    ? 'border-orange-500 bg-zinc-900/50' 
                    : 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-700'
                }`}
              >
                {selectedPlan === 'mega' && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    BEST VALUE
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${selectedPlan === 'mega' ? 'bg-orange-500/20 text-orange-500' : 'bg-zinc-800 text-zinc-400'}`}>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$9.99</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">7-Day Mega Boost</h3>
                <p className="text-zinc-400 text-sm mb-4">Maximum exposure for a full week.</p>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit">
                  <Star className="w-3 h-3 fill-current" /> 💎 Premium Badge
                </div>
              </motion.div>
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="bg-zinc-800 text-zinc-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
              Payment Method
            </h2>
            <div className="bg-zinc-900/30 rounded-2xl p-1 border border-zinc-800 flex mb-6">
              <button
                onClick={() => setPaymentMethod('credits')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === 'credits' 
                    ? 'bg-zinc-800 text-white shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4" /> Flexy Credits
              </button>
              <button
                onClick={() => setPaymentMethod('direct')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === 'direct' 
                    ? 'bg-zinc-800 text-white shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Direct Pay
              </button>
            </div>

            {paymentMethod === 'credits' ? (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Available Balance</p>
                  <p className="text-2xl font-bold text-white">€{userBalance.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400 text-sm mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {selectedPlan === 'flash' ? '$1.99' : '$9.99'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
                <CreditCard className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">Stripe / Crypto Integration Placeholder</p>
              </div>
            )}

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer">
              <Zap className="w-5 h-5 fill-current" />
              Boost Now
            </button>
          </div>

        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Live Preview
            </h2>
            
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className={`relative rounded-xl overflow-hidden bg-zinc-950 border transition-all duration-500 group ${
                selectedPlan === 'flash' 
                  ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.15)]' 
                  : 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
              }`}>
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  {selectedPlan === 'flash' ? (
                    <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" /> PULSE
                    </div>
                  ) : (
                    <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> PREMIUM
                    </div>
                  )}
                </div>

                <div className="aspect-[4/3] relative">
                  <img src={selectedArtwork.image} alt={selectedArtwork.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg truncate">{selectedArtwork.title}</h3>
                    <p className="text-zinc-300 text-sm">{selectedArtwork.price}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Top of search results</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Highlighted in Trending</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{selectedPlan === 'flash' ? '24 hours duration' : '7 days duration'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
