import React from 'react';
import { ProjectConfig } from '../types';
import { Icons } from './Icons';

interface DashboardPreviewProps {
  config: ProjectConfig;
  onReset: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ config, onReset }) => {
  return (
    <div className="w-full h-full animate-fade-in">
      {/* Mock Browser Chrome */}
      <div className="bg-[#1e1e24] rounded-t-xl border border-zinc-800 flex items-center px-4 py-3 gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-black/40 rounded-md px-3 py-1 text-xs text-zinc-400 font-mono text-center truncate">
          localhost:3000/dashboard
        </div>
      </div>

      {/* Mock App Content */}
      <div className="bg-[#0f0f12] rounded-b-xl border-x border-b border-zinc-800 min-h-[600px] flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-800 p-6 hidden md:block">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">S</span>
            </div>
            <span className="font-bold text-white tracking-tight">{config.name}</span>
          </div>
          
          <nav className="space-y-2">
            {['Overview', 'Projects', 'AI Tools', 'Settings'].map((item, i) => (
              <div key={item} className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${i === 0 ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-4 rounded-xl border border-white/5">
              <h4 className="text-xs font-bold text-white mb-1">Pro Plan</h4>
              <p className="text-[10px] text-zinc-400 mb-3">5,000/10,000 credits used</p>
              <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
               <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors">
                New Project
               </button>
               <div className="w-8 h-8 rounded-full bg-zinc-700 border border-zinc-600" />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Projects', value: '12', icon: Icons.LayoutDashboard, color: 'text-blue-400' },
              { label: 'AI Generations', value: '1,420', icon: Icons.Sparkles, color: 'text-purple-400' },
              { label: 'Storage Used', value: '4.2 GB', icon: Icons.Database, color: 'text-orange-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg bg-zinc-800 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    +12% <Icons.Rocket className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-zinc-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-500">
                      <Icons.Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Generated Content #{100 + i}</p>
                      <p className="text-xs text-zinc-500">2 minutes ago</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded border border-green-900/50">Completed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={onReset}
          className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm transition-colors"
        >
          <Icons.Cpu className="w-4 h-4" />
          Generate Another App
        </button>
      </div>
    </div>
  );
};