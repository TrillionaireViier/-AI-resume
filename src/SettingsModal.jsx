import React, { useState, useEffect } from 'react';
import { X, Settings, Key, CheckCircle2 } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, apiKey, setApiKey }) {
  const [localKey, setLocalKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalKey(apiKey || '');
      setSaved(false);
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(localKey);
    localStorage.setItem('gemini_api_key', localKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="bg-slate-800 p-1.5 rounded-lg border border-slate-700">
              <Settings className="w-5 h-5 text-slate-300" />
            </div>
            Settings
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Key size={16} className="text-indigo-400" /> Google Gemini API Key
            </label>
            <input
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 font-mono"
              placeholder="AIzaSy..."
            />
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              To use the AI generation features, you need a free Google Gemini API key. Your key is saved locally in your browser and is never sent to our servers.
              <br/><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Get a free key here</a>.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 border border-indigo-500/50"
          >
            {saved ? <><CheckCircle2 size={18} /> Saved successfully!</> : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
