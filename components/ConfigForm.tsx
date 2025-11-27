import React, { useState } from 'react';
import { ProjectConfig } from '../types';
import { Icons } from './Icons';
import { refineProjectDescription } from '../services/geminiService';

interface ConfigFormProps {
  onStart: (config: ProjectConfig) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ onStart }) => {
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [config, setConfig] = useState<ProjectConfig>({
    name: 'My AI SaaS',
    description: '',
    targetAudience: 'Small business owners',
    clerkKey: '',
    geminiKey: '',
    jinaKey: ''
  });

  const handleRefine = async () => {
    if (!config.description) return;
    setRefining(true);
    const refined = await refineProjectDescription(config.description, config.targetAudience);
    setConfig(prev => ({ ...prev, description: refined }));
    setRefining(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate initial validation delay
    setTimeout(() => onStart(config), 800);
  };

  return (
    <div className="max-w-2xl mx-auto glass-panel p-8 rounded-2xl shadow-2xl border-t border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Icons.Sparkles className="text-purple-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Project Specs</h2>
          <p className="text-zinc-400 text-sm">Define your SaaS parameters for the agent swarm.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Project Name</label>
            <input
              type="text"
              value={config.name}
              onChange={e => setConfig({ ...config, name: e.target.value })}
              className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g. ContentWizard AI"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Target Audience</label>
            <input
              type="text"
              value={config.targetAudience}
              onChange={e => setConfig({ ...config, targetAudience: e.target.value })}
              className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g. Marketing Agencies"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Core Logic / Idea</label>
            <button
              type="button"
              onClick={handleRefine}
              disabled={refining || !config.description}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 disabled:opacity-50 transition-colors"
            >
              {refining ? <Icons.Loader2 className="animate-spin w-3 h-3" /> : <Icons.Sparkles className="w-3 h-3" />}
              Refine with Gemini
            </button>
          </div>
          <textarea
            value={config.description}
            onChange={e => setConfig({ ...config, description: e.target.value })}
            className="w-full bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
            placeholder="Describe what your SaaS does..."
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-300">Environment Configuration</h3>
          <div className="grid grid-cols-1 gap-4">
             {/* Mock fields for visual demo - they don't actually do anything in this client-side demo */}
            <div className="relative group">
              <input
                type="password"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="CLERK_PUBLISHABLE_KEY"
                disabled
              />
              <div className="absolute right-3 top-3 text-xs text-zinc-600">MOCKED</div>
            </div>
             <div className="relative group">
              <input
                type="password"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="OPENAI_API_KEY"
                disabled
              />
               <div className="absolute right-3 top-3 text-xs text-zinc-600">MOCKED</div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 italic">
            * For this demo, API keys are mocked. We will use the internal system key for the refinement step.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !config.description}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icons.Loader2 className="animate-spin w-5 h-5" />
              Initializing Agents...
            </>
          ) : (
            <>
              <Icons.Rocket className="w-5 h-5" />
              Launch Builder Swarm
            </>
          )}
        </button>
      </form>
    </div>
  );
};