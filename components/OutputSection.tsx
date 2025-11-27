import React, { useState } from 'react';
import { CopyIcon, CheckIcon, SparklesIcon } from './Icons';

interface OutputSectionProps {
  output: string;
  isGenerating: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({ output, isGenerating }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!output && !isGenerating) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 text-gray-500 dark:text-gray-400">
        <div className="w-20 h-20 bg-gray-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
          <SparklesIcon className="w-10 h-10 text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
        <p className="max-w-xs mx-auto text-sm">
          Enter your basic idea on the left, configure your preferences, and watch the magic happen here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col h-full min-h-[400px] relative transition-all">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Generated Result
        </h2>
        {output && (
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${copied 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300'
              }
            `}
          >
            {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      <div className="flex-1 p-0 overflow-hidden relative group">
        {isGenerating ? (
          <div className="absolute inset-0 p-6 space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="space-y-2 mt-8">
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
        ) : (
          <textarea
            readOnly
            value={output}
            className="w-full h-full p-6 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};

export default OutputSection;