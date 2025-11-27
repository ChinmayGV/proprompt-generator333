import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import OutputSection from "./components/OutputSection";
import { PromptConfig, Tone, Complexity, Format } from "./types";
import { generateEnhancedPrompt } from "./services/geminiService";

const App: React.FC = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Data State
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuration State
  const [config, setConfig] = useState<PromptConfig>({
    tone: Tone.PROFESSIONAL,
    complexity: Complexity.INTERMEDIATE,
    format: Format.TEXT,
    includeExamples: false,
  });

  // Handle Theme Change
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setError(null);
    setOutput("");

    try {
      const result = await generateEnhancedPrompt(input, config);
      setOutput(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto hover:text-red-900 dark:hover:text-red-300"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Input */}
          <section className="h-full">
            <InputSection
              input={input}
              setInput={setInput}
              config={config}
              setConfig={setConfig}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </section>

          {/* Right Column: Output */}
          <section className="h-full">
            <OutputSection output={output} isGenerating={isGenerating} />
          </section>
        </div>
      </main>

      <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Powered Completely by AI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
