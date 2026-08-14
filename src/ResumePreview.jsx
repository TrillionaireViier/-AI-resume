import React, { forwardRef } from 'react';

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-sm border border-slate-200 overflow-y-auto h-full w-full max-w-[800px] mx-auto text-slate-800" ref={ref}>
      
      {/* Header */}
      <div className="border-b-2 border-slate-800 pb-6 mb-6">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide text-slate-900">{data.name || 'Your Name'}</h1>
        <h2 className="text-xl text-brandPrimary font-medium mt-1">{data.title || 'Professional Title'}</h2>
        
        <div className="flex gap-4 mt-4 text-sm text-slate-600 font-medium">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>|</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">Professional Summary</h3>
        <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
          {data.summary || 'Your professional summary will appear here.'}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">Experience</h3>
        
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
            <h4 className="font-bold text-slate-800">{data.company || 'Company Name'}</h4>
            <span className="text-sm font-medium text-slate-500">{data.duration || 'Date Range'}</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap ml-4">
            {data.experience || 'Your experience responsibilities will appear here.'}
          </p>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">Education</h3>
        <div className="flex justify-between items-end">
          <h4 className="font-bold text-slate-800">{data.education || 'University Name'}</h4>
          <span className="text-sm font-medium text-slate-700">{data.degree || 'Degree'}</span>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.skills ? data.skills.split(',').map((skill, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
              {skill.trim()}
            </span>
          )) : (
            <span className="text-sm text-slate-500">Your skills will appear here.</span>
          )}
        </div>
      </div>

    </div>
  );
});

export default ResumePreview;
