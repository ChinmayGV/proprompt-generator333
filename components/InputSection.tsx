import React from 'react';
import { PromptConfig, Tone, Complexity, Format } from '../types';
import { WandIcon, SettingsIcon, SparklesIcon } from './Icons';

interface InputSectionProps {
  input: string;
  setInput: (value: string) => void;
  config: PromptConfig;
  setConfig: (config: PromptConfig) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  config,
  setConfig,
  onGenerate,
  isGenerating,
}) => {
  const handleChange = (field: keyof PromptConfig, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 flex items-center gap-2">
        <WandIcon className="w-5 h-5 text-primary-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Input & Configuration</h2>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div className="flex-1">
          <label htmlFor="promptInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Idea / Draft
          </label>
          <textarea
            id="promptInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Write a blog post about coffee..."
            className="w-full h-32 sm:h-40 p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none placeholder-gray-400 dark:placeholder-slate-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <SettingsIcon className="w-4 h-4" />
            <span>Refinement Options</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Tone</label>
              <select
                value={config.tone}
                onChange={(e) => handleChange('tone', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
              >
                {Object.values(Tone).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Complexity</label>
              <select
                value={config.complexity}
                onChange={(e) => handleChange('complexity', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
              >
                {Object.values(Complexity).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Output Format</label>
              <select
                value={config.format}
                onChange={(e) => handleChange('format', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
              >
                {Object.values(Format).map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

             <div className="flex items-center h-full pt-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={config.includeExamples}
                      onChange={(e) => handleChange('includeExamples', e.target.checked)}
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Include Examples
                  </span>
                </label>
            </div>
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={!input.trim() || isGenerating}
          className={`
            w-full mt-2 py-4 px-6 rounded-xl font-bold text-white shadow-lg 
            flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]
            ${!input.trim() || isGenerating 
              ? 'bg-gray-400 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-primary-500/30'
            }
          `}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Optimizing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generate Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;