import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code, Wand2, CheckCircle2, Loader2 } from 'lucide-react';

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={onChange} 
      className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 shadow-inner" 
      placeholder={placeholder} 
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, onEnhance, isEnhancing }) => (
  <div className="mb-6 relative group">
    <div className="flex justify-between items-end mb-1.5 ml-1">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <button 
        onClick={onEnhance} 
        disabled={isEnhancing}
        className="flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-500/40 transition-all disabled:opacity-50"
      >
        {isEnhancing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
        {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
      </button>
    </div>
    <textarea 
      rows="4" 
      value={value} 
      onChange={onChange} 
      className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 shadow-inner resize-none" 
      placeholder={placeholder}
    />
  </div>
);

export default function ResumeForm({ data, updateData }) {
  const [enhancingField, setEnhancingField] = useState(null);
  
  const handleAiEnhance = (field) => {
    setEnhancingField(field);
    
    // Simulate API call for AI enhancement
    setTimeout(() => {
      const enhancements = {
        summary: "Dynamic and results-oriented professional with a proven track record of leveraging innovative technologies to drive business growth. Adept at cross-functional collaboration and delivering high-impact solutions in fast-paced environments.",
        experience: "• Spearheaded the development of a scalable cloud architecture, reducing operational costs by 30%.\n• Managed a cross-functional team of 10+ engineers to deliver a flagship product 2 months ahead of schedule.\n• Implemented robust CI/CD pipelines that accelerated deployment times by 40% while maintaining 99.9% uptime."
      };
      
      updateData({ ...data, [field]: enhancements[field] });
      setEnhancingField(null);
    }, 1200);
  };

  const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-slate-800">
      <div className="bg-slate-800 p-1.5 rounded-md border border-slate-700">
        <Icon className="text-indigo-400 w-5 h-5" />
      </div>
      {title}
    </h2>
  );

  return (
    <div className="lg:h-full lg:overflow-y-auto pr-2 lg:pr-4 custom-scrollbar pb-12">
      
      {/* Personal Info */}
      <div className="mb-10">
        <SectionTitle icon={User} title="Personal Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField label="Full Name" value={data.name} onChange={e => updateData({...data, name: e.target.value})} placeholder="e.g. John Doe" />
          <InputField label="Job Title" value={data.title} onChange={e => updateData({...data, title: e.target.value})} placeholder="e.g. Senior Software Engineer" />
          <InputField label="Email Address" type="email" value={data.email} onChange={e => updateData({...data, email: e.target.value})} placeholder="john@example.com" />
          <InputField label="Phone Number" type="tel" value={data.phone} onChange={e => updateData({...data, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-10">
        <SectionTitle icon={Sparkles} title="Professional Summary" />
        <TextAreaField 
          label="Summary" 
          value={data.summary} 
          onChange={e => updateData({...data, summary: e.target.value})} 
          placeholder="Briefly describe your professional background and key strengths..."
          onEnhance={() => handleAiEnhance('summary')}
          isEnhancing={enhancingField === 'summary'}
        />
      </div>

      {/* Experience */}
      <div className="mb-10">
        <SectionTitle icon={Briefcase} title="Work Experience" />
        <div className="bg-slate-800/20 border border-slate-700/30 p-5 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="Company Name" value={data.company} onChange={e => updateData({...data, company: e.target.value})} placeholder="e.g. Tech Corp Inc." />
            <InputField label="Duration" value={data.duration} onChange={e => updateData({...data, duration: e.target.value})} placeholder="e.g. Jan 2020 - Present" />
          </div>
          <TextAreaField 
            label="Key Responsibilities & Achievements" 
            value={data.experience} 
            onChange={e => updateData({...data, experience: e.target.value})} 
            placeholder="• Developed X using Y resulting in Z...&#10;• Led team of..."
            onEnhance={() => handleAiEnhance('experience')}
            isEnhancing={enhancingField === 'experience'}
          />
        </div>
      </div>

      {/* Education */}
      <div className="mb-10">
        <SectionTitle icon={GraduationCap} title="Education" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField label="Institution" value={data.education} onChange={e => updateData({...data, education: e.target.value})} placeholder="e.g. Stanford University" />
          <InputField label="Degree / Field of Study" value={data.degree} onChange={e => updateData({...data, degree: e.target.value})} placeholder="e.g. B.S. Computer Science" />
        </div>
      </div>
      
      {/* Skills */}
      <div className="mb-6">
        <SectionTitle icon={Code} title="Technical Skills" />
        <div className="mb-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Skills (Comma Separated)</label>
          <input 
            type="text" 
            value={data.skills} 
            onChange={e => updateData({...data, skills: e.target.value})} 
            className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 shadow-inner" 
            placeholder="e.g. JavaScript, React, Node.js, Python, AWS" 
          />
        </div>
      </div>
    </div>
  );
}
