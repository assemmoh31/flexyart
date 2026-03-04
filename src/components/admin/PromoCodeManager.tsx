import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, Calendar, Percent } from 'lucide-react';

// Mock Data
const mockPromos = [
  { id: 1, code: "WELCOME20", discount: "20%", type: "Percentage", usage: 150, limit: 500, expiry: "2024-12-31", status: "Active" },
  { id: 2, code: "FLASH50", discount: "50%", type: "Percentage", usage: 45, limit: 100, expiry: "2024-03-15", status: "Active" },
  { id: 3, code: "FREESHIP", discount: "Free Shipping", type: "Fixed", usage: 1200, limit: "Unlimited", expiry: "2025-01-01", status: "Inactive" }
];

export default function PromoCodeManager() {
  const [promos, setPromos] = useState(mockPromos);
  const [newPromo, setNewPromo] = useState({ code: '', discount: '', limit: '' });

  const handleDelete = (id: number) => {
    setPromos(promos.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    // Add logic
    console.log('Adding promo:', newPromo);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Tag className="w-6 h-6 text-cyan-400" /> Promo Code Manager
          </h2>
          <p className="text-slate-400 text-sm">Create and manage discount codes for marketing campaigns.</p>
        </div>
        <button 
          onClick={() => document.getElementById('add-promo-modal')?.showModal()}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Code
        </button>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-medium text-sm uppercase tracking-wider">
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Usage / Limit</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-sm">
              {promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4 font-mono font-bold text-white tracking-wider">{promo.code}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-cyan-400 font-bold">
                      <Percent className="w-3 h-3" /> {promo.discount}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full" 
                          style={{ width: `${(promo.usage / (typeof promo.limit === 'number' ? promo.limit : 2000)) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">{promo.usage} / {promo.limit}</span>
                    </div>
                  </td>
                  <td className="p-4 flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3 h-3" /> {promo.expiry}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      promo.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal for Add Promo (Conceptual) */}
      <dialog id="add-promo-modal" className="modal bg-slate-900 text-white p-6 rounded-xl border border-slate-700 backdrop:backdrop-blur-sm">
        <h3 className="font-bold text-lg mb-4">Create New Promo Code</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Code (e.g. SUMMER24)" className="w-full bg-slate-950 border border-slate-800 p-2 rounded" />
          <input type="text" placeholder="Discount %" className="w-full bg-slate-950 border border-slate-800 p-2 rounded" />
          <div className="flex justify-end gap-2 mt-6">
            <button className="px-4 py-2 text-slate-400 hover:text-white" onClick={() => document.getElementById('add-promo-modal')?.close()}>Cancel</button>
            <button className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600" onClick={() => document.getElementById('add-promo-modal')?.close()}>Create</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
