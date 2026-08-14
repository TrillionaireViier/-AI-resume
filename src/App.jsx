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
      margin:       0.5,
      filename:     `${resumeData.name || 'resume'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen flex flex-col h-screen overflow-hidden">
      <header className="bg-brandDark text-white h-16 flex justify-between items-center px-6 shadow-md z-10 shrink-0">
        <div className="text-xl font-bold tracking-tight text-brandLight flex items-center gap-2">
          <Sparkles className="text-brandPrimary" />
          AI Resume Builder
        </div>
        <button 
          onClick={handleDownloadPdf}
          className="bg-brandPrimary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" /> Export PDF
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left pane: Form */}
        <div className="w-1/2 p-6 bg-slate-50 border-r border-slate-200 overflow-hidden">
          <ResumeForm data={resumeData} updateData={setResumeData} />
        </div>
        
        {/* Right pane: Preview */}
        <div className="w-1/2 p-6 bg-slate-200 overflow-auto flex justify-center items-start">
          <ResumePreview data={resumeData} ref={printRef} />
        </div>
      </main>
    </div>
  );
}

export default App;
