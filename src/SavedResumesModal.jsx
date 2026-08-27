import React, { useState, useEffect } from 'react';
import { X, FolderHeart, Save, Download, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

export default function SavedResumesModal({ isOpen, onClose, currentResumeData, onLoadResume }) {
  const [savedResumes, setSavedResumes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [customName, setCustomName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSavedList();
      setIsSaving(false);
      setCustomName('');
      setSavedSuccess(false);
    }
  }, [isOpen]);

  const loadSavedList = () => {
    try {
      const stored = localStorage.getItem('ai_resume_history');
      if (stored) {
        setSavedResumes(JSON.parse(stored));
      } else {
        setSavedResumes([]);
      }
    } catch (e) {
      console.error('Failed to load saved resumes', e);
      setSavedResumes([]);
    }
  };

  const handleSaveCurrent = () => {
    const defaultName = currentResumeData.name 
      ? `${currentResumeData.name} - ${new Date().toLocaleDateString()}` 
      : `Draft - ${new Date().toLocaleString()}`;
    
    const finalName = customName.trim() || defaultName;
    
    const newEntry = {
      id: Date.now().toString(),
      name: finalName,
      timestamp: new Date().toISOString(),
      data: currentResumeData
    };

    const updatedList = [newEntry, ...savedResumes];
    localStorage.setItem('ai_resume_history', JSON.stringify(updatedList));
    setSavedResumes(updatedList);
    
    setSavedSuccess(true);
    setIsSaving(false);
    setCustomName('');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const executeDelete = (id) => {
    const updatedList = savedResumes.filter(r => r.id !== id);
    localStorage.setItem('ai_resume_history', JSON.stringify(updatedList));
    setSavedResumes(updatedList);
    setConfirmDeleteId(null);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedResumes));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume_history_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="bg-indigo-500/20 p-1.5 rounded-lg border border-indigo-500/30">
              <FolderHeart className="w-5 h-5 text-indigo-400" />
            </div>
            My Resumes
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar bg-slate-900 flex flex-col gap-6">
          
          {/* Save New Section */}
          <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Save Current Resume</h4>
            {isSaving ? (
              <div className="flex gap-2 items-center">
                <input 
                  type="text" 
                  autoFocus
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter name (e.g. Google Application)" 
                  className="flex-1 bg-slate-900 border border-slate-600 text-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none text-sm"
                />
                <button 
                  onClick={handleSaveCurrent}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
                >
                  Confirm Save
                </button>
                <button 
                  onClick={() => setIsSaving(false)}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSaving(true)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 py-3 rounded-lg font-bold transition-all"
              >
                {savedSuccess ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Save size={18} />}
                {savedSuccess ? "Saved successfully!" : "Save Current Progress"}
              </button>
            )}
          </div>

          {/* List of Saved Resumes */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Saved History</h4>
              {savedResumes.length > 0 && (
                <button 
                  onClick={handleExportJson}
                  className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
                  title="Download Backup"
                >
                  <Download size={14} /> Export Backup
                </button>
              )}
            </div>
            {savedResumes.length === 0 ? (
              <div className="text-center p-8 bg-slate-800/20 border border-slate-700/30 rounded-xl text-slate-500">
                <FolderHeart size={32} className="mx-auto mb-3 opacity-50" />
                <p>No saved resumes yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedResumes.map((resume) => (
                  <div key={resume.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-500/30 transition-colors">
                    <div>
                      <h5 className="font-bold text-slate-200 text-sm mb-1">{resume.name}</h5>
                      <p className="text-xs text-slate-500">{new Date(resume.timestamp).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => {
                          onLoadResume(resume.data);
                          onClose();
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-emerald-500/20"
                      >
                        <Download size={14} /> Load
                      </button>
                      
                      {confirmDeleteId === resume.id ? (
                        <div className="flex gap-1.5 items-center">
                          <button 
                            onClick={() => executeDelete(resume.id)} 
                            className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-2.5 py-1.5 rounded-lg font-bold transition-colors"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => setConfirmDeleteId(null)} 
                            className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setConfirmDeleteId(resume.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-700/50 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
