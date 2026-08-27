import React, { useState, useEffect } from 'react';
import { X, Wand2, Check, Clock, AlertCircle } from 'lucide-react';
import { generateResumeContent } from './lib/gemini';

export default function AiGeneratorModal({ isOpen, onClose, fieldType, currentText, onApply, apiKey }) {
  const [inputText, setInputText] = useState('');
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setInputText(currentText || '');
      setError('');
    }
  }, [isOpen, currentText]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!apiKey) {
      setError('Please set your Gemini API Key in Settings first.');
      return;
    }
    if (!inputText.trim()) {
      setError('Please enter some rough notes for the AI to enhance.');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      const generatedText = await generateResumeContent(apiKey, inputText, fieldType);
      
      const newEntry = {
        id: Date.now(),
        prompt: inputText,
        result: generatedText,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setHistory([newEntry, ...history]);
    } catch (err) {
      setError(err.message || 'Failed to generate content. Check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Column: Input */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="bg-indigo-500/20 p-1.5 rounded-lg border border-indigo-500/30">
                <Wand2 className="w-5 h-5 text-indigo-400" />
              </div>
              AI Enhancer
            </h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors lg:hidden">
              <X size={20} />
            </button>
          </div>

          <p className="text-slate-400 text-sm mb-4">
            {fieldType === 'summary' 
              ? "Write a rough draft of your professional summary. The AI will make it polished and compelling."
              : "Jot down some rough notes about what you did in this role. The AI will turn them into professional STAR-method bullet points."}
          </p>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full flex-1 bg-slate-800 border border-slate-700 text-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 resize-none mb-4"
            placeholder="Type your rough notes here..."
          />

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2 text-rose-400 text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 border border-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Magic...
              </>
            ) : (
              <>
                <Wand2 size={18} /> Generate Options
              </>
            )}
          </button>
        </div>

        {/* Right Column: History & Results */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col bg-slate-900 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors hidden lg:block z-10">
            <X size={20} />
          </button>

          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock size={16} /> Generation History
          </h4>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 space-y-3 pb-12">
                <Wand2 size={48} className="text-slate-600" />
                <p>Generated options will appear here.</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 transition-all hover:border-indigo-500/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-slate-500">{item.timestamp}</span>
                    <button
                      onClick={() => {
                        onApply(item.result);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Check size={14} /> Apply to Resume
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed">
                    {item.result}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
