import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { FileDown, Sparkles } from 'lucide-react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

function App() {
  const [resumeData, setResumeData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
    company: '',
    duration: '',
    experience: '',
    education: '',
    degree: '',
    skills: ''
  });

  const printRef = useRef();

  const handleDownloadPdf = () => {
    const element = printRef.current;
    const opt = {
      margin:       0,
      filename:     `${resumeData.name ? resumeData.name.replace(/\s+/g, '_') : 'Resume'}.pdf`,
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 3, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

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
        <button 
          onClick={handleDownloadPdf}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 text-sm border border-indigo-500/50 hover:scale-105 active:scale-95"
        >
          <FileDown className="w-4 h-4" /> Export to PDF
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Left pane: Form (Dark Mode) */}
        <div className="w-full lg:w-[45%] p-6 bg-slate-900 border-b lg:border-b-0 lg:border-r border-white/10 relative shadow-2xl z-10 lg:overflow-y-auto custom-scrollbar">
          {/* Subtle gradient orb for background aesthetic */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px]"></div>
          </div>
          
          <div className="relative z-10 h-full">
            <ResumeForm data={resumeData} updateData={setResumeData} />
          </div>
        </div>
        
        {/* Right pane: Preview (Light Mode / Paper) */}
        <div className="w-full lg:w-[55%] p-4 lg:p-8 bg-slate-100 flex justify-center items-start shadow-inner relative overflow-x-auto lg:overflow-y-auto custom-scrollbar">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          <div className="shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-white origin-top" style={{ transform: 'scale(1)', transformOrigin: 'top center' }}>
            <ResumePreview data={resumeData} ref={printRef} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
