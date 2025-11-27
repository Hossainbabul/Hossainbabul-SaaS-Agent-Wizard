import React, { useEffect, useRef } from 'react';
import { AgentLog } from '../types';

interface TerminalOutputProps {
  logs: AgentLog[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full h-[400px] bg-black/80 rounded-lg border border-zinc-800 font-mono text-sm p-4 overflow-y-auto shadow-inner custom-scrollbar relative">
      <div className="absolute top-2 right-2 text-xs text-zinc-500 uppercase tracking-wider border border-zinc-800 px-2 py-1 rounded">
        Agent Uplink: Active
      </div>
      <div className="space-y-2 mt-6">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 animate-fade-in">
            <span className="text-zinc-500 text-xs mt-1 shrink-0">{log.timestamp}</span>
            <div className="flex-1">
              <span className={`font-bold uppercase tracking-wider text-xs mr-2 ${
                log.agent === 'ORCHESTRATOR' ? 'text-purple-400' :
                log.agent === 'DESIGN' ? 'text-pink-400' :
                log.agent === 'RESEARCH' ? 'text-blue-400' :
                log.agent === 'CONVEX' ? 'text-orange-400' :
                'text-green-400'
              }`}>
                [{log.agent}]
              </span>
              <span className={`${
                log.status === 'error' ? 'text-red-400' : 
                log.status === 'success' ? 'text-green-400' : 
                'text-zinc-300'
              }`}>
                {log.message}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};