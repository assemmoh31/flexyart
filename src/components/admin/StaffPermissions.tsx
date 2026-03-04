import React, { useState } from 'react';
import { Users, Shield, Lock, CheckSquare, Square } from 'lucide-react';

// Mock Data
const mockRoles = [
  { id: 1, name: "Super Admin", permissions: ["all"], users: 2 },
  { id: 2, name: "Moderator", permissions: ["content_view", "content_delete", "user_ban"], users: 5 },
  { id: 3, name: "Financial Admin", permissions: ["finance_view", "payout_process"], users: 1 }
];

const allPermissions = [
  { id: "content_view", label: "View Content" },
  { id: "content_delete", label: "Delete Content" },
  { id: "user_ban", label: "Ban Users" },
  { id: "finance_view", label: "View Finances" },
  { id: "payout_process", label: "Process Payouts" },
  { id: "settings_edit", label: "Edit Site Settings" }
];

export default function StaffPermissions() {
  const [roles, setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);

  const togglePermission = (permId: string) => {
    if (selectedRole.permissions.includes("all")) return; // Super Admin is immutable
    
    const updatedPermissions = selectedRole.permissions.includes(permId)
      ? selectedRole.permissions.filter(p => p !== permId)
      : [...selectedRole.permissions, permId];
    
    const updatedRole = { ...selectedRole, permissions: updatedPermissions };
    setSelectedRole(updatedRole);
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Roles List */}
      <div className="w-1/3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> Staff Roles
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {roles.map(role => (
            <div 
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`p-4 rounded-lg cursor-pointer transition-colors border group ${selectedRole.id === role.id ? 'bg-slate-800 border-cyan-500/50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold ${selectedRole.id === role.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{role.name}</span>
                <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">{role.users} Users</span>
              </div>
            </div>
          ))}
          <button className="w-full py-3 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50 rounded-lg border border-dashed border-slate-700 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Create New Role
          </button>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden flex flex-col p-6">
        <div className="mb-6 border-b border-slate-800 pb-4">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" /> {selectedRole.name} Permissions
          </h3>
          <p className="text-slate-400 text-sm mt-1">Configure access levels for this role.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allPermissions.map(perm => {
            const isChecked = selectedRole.permissions.includes("all") || selectedRole.permissions.includes(perm.id);
            const isDisabled = selectedRole.permissions.includes("all");

            return (
              <div 
                key={perm.id}
                onClick={() => !isDisabled && togglePermission(perm.id)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                  isChecked 
                    ? 'bg-cyan-500/10 border-cyan-500/30' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Lock className={`w-5 h-5 ${isChecked ? 'text-cyan-400' : 'text-slate-600'}`} />
                  <span className={`font-medium ${isChecked ? 'text-white' : 'text-slate-400'}`}>{perm.label}</span>
                </div>
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-600" />
                )}
              </div>
            );
          })}
        </div>
        
        {selectedRole.permissions.includes("all") && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" /> Super Admin has full access to all system features. This cannot be modified.
          </div>
        )}
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
