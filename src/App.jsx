import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FileDown, Sparkles, Settings, FolderHeart } from 'lucide-react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import SettingsModal from './SettingsModal';
import AiGeneratorModal from './AiGeneratorModal';
import SavedResumesModal from './SavedResumesModal';

function App() {
  const [resumeData, setResumeData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
    experienceList: [{ id: Date.now(), company: '', duration: '', experience: '' }],
    educationList: [{ id: Date.now(), institution: '', degree: '' }],
    skills: ''
  });

  const printRef = useRef();
  const containerRef = useRef();
  const [previewScale, setPreviewScale] = useState(1);
  
  // Settings, AI, & History State
  const [apiKey, setApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSavedResumesOpen, setIsSavedResumesOpen] = useState(false);
  const [aiModalState, setAiModalState] = useState({ isOpen: false, fieldType: null, fieldId: null, currentText: '' });

  useEffect(() => {
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const openAiModal = (fieldType, fieldId, currentText) => {
    setAiModalState({ isOpen: true, fieldType, fieldId, currentText });
  };

  const handleApplyAiResult = (result) => {
    if (aiModalState.fieldType === 'summary') {
      setResumeData(prev => ({ ...prev, summary: result }));
    } else if (aiModalState.fieldType === 'experience') {
      setResumeData(prev => {
        const updatedList = prev.experienceList.map(exp => 
          exp.id === aiModalState.fieldId ? { ...exp, experience: result } : exp
        );
        return { ...prev, experienceList: updatedList };
      });
    }
  };

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const resumeWidth = 816;
        const padding = 32;
        
        if (containerWidth < resumeWidth + padding) {
          setPreviewScale((containerWidth - padding) / resumeWidth);
        } else {
          setPreviewScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleDownloadPdf = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.name ? resumeData.name.replace(/\s+/g, '_') : 'Resume'}`,
  });

  return (
    <div className="min-h-screen flex flex-col lg:h-screen lg:overflow-hidden font-sans bg-slate-900">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-md text-white h-16 flex justify-between items-center px-4 lg:px-8 shadow-xl z-20 border-b border-white/10 shrink-0">
        <div className="text-xl font-bold tracking-tight flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hidden sm:inline">
            AI Resume Builder
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSavedResumesOpen(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg font-medium transition-all text-sm border border-slate-700/50"
            title="Saved Resumes"
          >
            <FolderHeart className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">My Resumes</span>
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={handleDownloadPdf}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 text-sm border border-indigo-500/50 hover:scale-105 active:scale-95"
          >
            <FileDown className="w-4 h-4" /> Export to PDF
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Left pane: Form (Dark Mode) */}
        <div className="w-full lg:w-[45%] p-6 bg-slate-900 border-b lg:border-b-0 lg:border-r border-white/10 relative shadow-2xl z-10 lg:overflow-y-auto custom-scrollbar">
          {/* Subtle gradient orb for background aesthetic */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px]"></div>
          </div>
          
          <div className="relative z-10 h-full">
            <ResumeForm data={resumeData} updateData={setResumeData} onOpenAiModal={openAiModal} />
          </div>
        </div>
        
        {/* Right pane: Preview (Light Mode / Paper) */}
        <div ref={containerRef} className="w-full lg:w-[55%] p-4 lg:p-8 bg-slate-100 flex justify-center items-start shadow-inner relative overflow-x-hidden lg:overflow-y-auto custom-scrollbar">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          <div className="shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-white origin-top" style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center', marginBottom: `calc(${(1 - previewScale) * -11}in)` }}>
            <ResumePreview data={resumeData} ref={printRef} />
          </div>
        </div>
      </main>

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKey={apiKey} 
        setApiKey={setApiKey} 
      />
      
      <AiGeneratorModal 
        isOpen={aiModalState.isOpen}
        onClose={() => setAiModalState({ ...aiModalState, isOpen: false })}
        fieldType={aiModalState.fieldType}
        currentText={aiModalState.currentText}
        onApply={handleApplyAiResult}
        apiKey={apiKey}
      />
      
      <SavedResumesModal
        isOpen={isSavedResumesOpen}
        onClose={() => setIsSavedResumesOpen(false)}
        currentResumeData={resumeData}
        onLoadResume={setResumeData}
      />
    </div>
  );
}

export default App;
