import React, { forwardRef } from 'react';

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div 
      className="bg-white mx-auto text-slate-800 font-sans" 
      ref={ref}
      style={{
        width: '8.5in',
        minHeight: '11in',
        padding: '0',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section */}
      <div className="bg-slate-900 text-white px-10 py-10 border-b-8 border-indigo-500 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold uppercase tracking-widest text-white mb-2">
            {data.name || 'JOHN DOE'}
          </h1>
          <h2 className="text-lg font-medium text-indigo-300 tracking-wide uppercase">
            {data.title || 'Professional Title'}
          </h2>
        </div>
        <div className="text-right text-sm text-slate-300 font-medium space-y-1">
          {data.email && <div className="flex items-center justify-end gap-2"><span>{data.email}</span></div>}
          {data.phone && <div className="flex items-center justify-end gap-2"><span>{data.phone}</span></div>}
        </div>
      </div>

      {/* Main Content 2-Column Layout */}
      <div className="flex" style={{ minHeight: 'calc(11in - 160px)' }}>
        
        {/* Left Column (Main Content) */}
        <div className="w-2/3 p-10 pr-6 border-r border-slate-200">
          
          {/* Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-4 h-4 bg-indigo-500 inline-block rounded-sm"></span> Profile
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
              {data.summary || 'A highly motivated professional with a passion for delivering exceptional results. Proven ability to work collaboratively in fast-paced environments.'}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-indigo-500 inline-block rounded-sm"></span> Experience
            </h3>
            
            <div className="mb-6 relative pl-4 border-l-2 border-indigo-200">
              <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{data.company || 'Company Name'}</h4>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded tracking-wider uppercase">{data.duration || 'Date Range'}</span>
              </div>
              <div className="text-sm font-medium text-slate-500 mb-2 italic">Previous Role</div>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                {data.experience || '• Contributed to key projects and delivered results.\n• Collaborated with cross-functional teams.'}
              </p>
            </div>
            
            {/* Placeholder for visual layout depth if user hasn't added much */}
            {!data.experience && (
              <div className="mb-4 relative pl-4 border-l-2 border-slate-200">
                <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
                <h4 className="font-bold text-slate-400 text-base mb-1">Previous Company</h4>
                <p className="text-sm leading-relaxed text-slate-400">Additional experience entries will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-1/3 p-10 pl-6 bg-slate-50">
          
          {/* Education */}
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-indigo-200 pb-2">
              Education
            </h3>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{data.degree || 'Degree Name'}</h4>
              <p className="text-sm text-slate-600 mt-1">{data.education || 'University Name'}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-indigo-200 pb-2">
              Expertise
            </h3>
            <div className="flex flex-col gap-2">
              {data.skills ? data.skills.split(',').map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">
                    {skill.trim()}
                  </span>
                </div>
              )) : (
                <>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="text-sm text-slate-400">Skill 1</span></div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="text-sm text-slate-400">Skill 2</span></div>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
