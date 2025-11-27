import React, { useState, useEffect, useCallback } from 'react';
import { ProjectConfig, AgentLog, WizardStep, AgentStatus } from './types';
import { ConfigForm } from './components/ConfigForm';
import { TerminalOutput } from './components/TerminalOutput';
import { DashboardPreview } from './components/DashboardPreview';
import { Icons } from './components/Icons';

// Simulation sequences mimicking the "Claude Code" workflow described
const AGENT_SEQUENCE = [
  { agent: 'ORCHESTRATOR', message: 'Initializing workflow parameters...', duration: 800 },
  { agent: 'ORCHESTRATOR', message: 'Loading design-generator agent...', duration: 1000 },
  { agent: 'DESIGN', message: 'Analyzing project requirements...', duration: 1500 },
  { agent: 'DESIGN', message: 'Generating design system (Tailwind CSS)...', duration: 1200 },
  { agent: 'DESIGN', message: 'Design system complete. Dashboard/Landing UI created.', duration: 800, status: 'success' },
  { agent: 'CONVEX', message: 'Initializing backend infrastructure...', duration: 1200 },
  { agent: 'CONVEX', message: 'Setting up schema.ts and auth.config.ts...', duration: 1500 },
  { agent: 'RESEARCH', message: 'Connecting to Jina AI for documentation scrape...', duration: 2000 },
  { agent: 'RESEARCH', message: 'Verifying AI SDK model signatures...', duration: 1500 },
  { agent: 'RESEARCH', message: 'Documentation verified: Google Gemini 2.5 Flash', duration: 1000, status: 'success' },
  { agent: 'AI_IMPL', message: 'Implementing AI features using Vercel AI SDK...', duration: 2000 },
  { agent: 'LANDING', message: 'Spawning 5 parallel agents for SEO pages...', duration: 800 },
  { agent: 'LANDING', message: 'Generating content: Features, Use Cases, Industry...', duration: 2500 },
  { agent: 'NEXTJS', message: 'Building frontend application...', duration: 2000 },
  { agent: 'TESTER', message: 'Running Playwright visual regression tests...', duration: 1500 },
  { agent: 'ORCHESTRATOR', message: 'Build complete. Preparing deployment...', duration: 1000, status: 'success' },
];

export default function App() {
  const [step, setStep] = useState<WizardStep>(WizardStep.CONFIG);
  const [config, setConfig] = useState<ProjectConfig | null>(null);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const addLog = useCallback((agent: string, message: string, status: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      agent,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' }),
      status
    }]);
  }, []);

  const runSimulation = useCallback(async () => {
    setStep(WizardStep.PROCESSING);
    setActiveStepIndex(0);
    setLogs([]);

    for (let i = 0; i < AGENT_SEQUENCE.length; i++) {
      const seq = AGENT_SEQUENCE[i];
      
      // Update visual step progress roughly based on agent type
      if (seq.agent === 'DESIGN') setActiveStepIndex(1);
      if (seq.agent === 'RESEARCH') setActiveStepIndex(2);
      if (seq.agent === 'CONVEX') setActiveStepIndex(3);
      if (seq.agent === 'AI_IMPL') setActiveStepIndex(4);
      if (seq.agent === 'NEXTJS') setActiveStepIndex(5);

      addLog(seq.agent, seq.message, seq.status as any || 'info');
      await new Promise(resolve => setTimeout(resolve, seq.duration));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(WizardStep.PREVIEW);
  }, [addLog]);

  const handleStart = (newConfig: ProjectConfig) => {
    setConfig(newConfig);
    runSimulation();
  };

  const handleReset = () => {
    setStep(WizardStep.CONFIG);
    setLogs([]);
    setActiveStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Icons.Cpu className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-white">
              SaaS<span className="text-purple-400">Agent</span>Wizard
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col">
        {step === WizardStep.CONFIG && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 mb-4">
                What are we building today?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Enter your requirements. Our multi-agent swarm will design, research, build, and deploy your SaaS in minutes.
              </p>
            </div>
            <ConfigForm onStart={handleStart} />
          </div>
        )}

        {step === WizardStep.PROCESSING && (
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full gap-8 animate-fade-in">
             {/* Progress Stepper */}
             <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10" />
                {['Init', 'Design', 'Research', 'Backend', 'AI Logic', 'Build'].map((label, idx) => (
                  <div key={label} className="flex flex-col items-center gap-2 bg-[#09090b] px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      idx <= activeStepIndex 
                        ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                        : 'border-zinc-800 bg-zinc-900 text-zinc-600'
                    }`}>
                      {idx < activeStepIndex ? <Icons.CheckCircle className="w-4 h-4" /> : <span className="text-xs font-mono">{idx + 1}</span>}
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-300 ${
                      idx <= activeStepIndex ? 'text-purple-300' : 'text-zinc-600'
                    }`}>{label}</span>
                  </div>
                ))}
             </div>

             <div className="text-center">
               <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                 <Icons.Loader2 className="animate-spin text-purple-500" />
                 Constructing {config?.name}...
               </h3>
               <p className="text-zinc-500 text-sm">Orchestrating agents to build your application.</p>
             </div>

             <TerminalOutput logs={logs} />
          </div>
        )}

        {step === WizardStep.PREVIEW && config && (
          <DashboardPreview config={config} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-600 text-sm">
          Powered by Gemini 2.5 • Convex • Clerk • Next.js
        </div>
      </footer>
    </div>
  );
}