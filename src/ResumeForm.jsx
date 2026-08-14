import React from 'react';
import { User, Briefcase, GraduationCap, Code, Wand2 } from 'lucide-react';

export default function ResumeForm({ data, updateData }) {
  
  const handleAiEnhance = (field) => {
    // Mock AI enhancement
    const enhancements = {
      summary: "Dynamic and results-oriented professional with a proven track record of leveraging innovative technologies to drive business growth. Adept at cross-functional collaboration and delivering high-impact solutions.",
      experience: "• Spearheaded the development of a scalable cloud architecture, reducing operational costs by 30%.\n• Managed a cross-functional team of 10+ engineers to deliver a flagship product 2 months ahead of schedule.\n• Implemented CI/CD pipelines that accelerated deployment times by 40%."
    };
    
    updateData({ ...data, [field]: enhancements[field] });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-brandDark mb-6 flex items-center gap-2">
        <User className="text-brandPrimary" /> Personal Details
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" value={data.name} onChange={e => updateData({...data, name: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
          <input type="text" value={data.title} onChange={e => updateData({...data, title: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="Software Engineer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" value={data.email} onChange={e => updateData({...data, email: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input type="tel" value={data.phone} onChange={e => updateData({...data, phone: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="+1 234 567 890" />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <label className="block text-sm font-medium text-slate-700">Professional Summary</label>
          <button onClick={() => handleAiEnhance('summary')} className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition">
            <Wand2 className="w-3 h-3" /> Enhance with AI
          </button>
        </div>
        <textarea rows="4" value={data.summary} onChange={e => updateData({...data, summary: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="A brief summary of your professional background..."></textarea>
      </div>

      <h2 className="text-2xl font-bold text-brandDark mb-6 flex items-center gap-2">
        <Briefcase className="text-brandPrimary" /> Work Experience
      </h2>
      <div className="mb-8 p-4 border border-slate-100 rounded-lg bg-slate-50">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
            <input type="text" value={data.company} onChange={e => updateData({...data, company: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="Tech Corp Inc." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
            <input type="text" value={data.duration} onChange={e => updateData({...data, duration: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="Jan 2020 - Present" />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="block text-sm font-medium text-slate-700">Description / Responsibilities</label>
            <button onClick={() => handleAiEnhance('experience')} className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition">
              <Wand2 className="w-3 h-3" /> Enhance with AI
            </button>
          </div>
          <textarea rows="5" value={data.experience} onChange={e => updateData({...data, experience: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="• Did this...&#10;• Did that..."></textarea>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-brandDark mb-6 flex items-center gap-2">
        <GraduationCap className="text-brandPrimary" /> Education
      </h2>
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">University / School</label>
            <input type="text" value={data.education} onChange={e => updateData({...data, education: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="State University" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Degree</label>
            <input type="text" value={data.degree} onChange={e => updateData({...data, degree: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="B.S. Computer Science" />
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-brandDark mb-6 flex items-center gap-2">
        <Code className="text-brandPrimary" /> Skills
      </h2>
      <div className="mb-4">
        <input type="text" value={data.skills} onChange={e => updateData({...data, skills: e.target.value})} className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-brandPrimary outline-none" placeholder="JavaScript, React, Node.js (Comma separated)" />
      </div>
    </div>
  );
}
