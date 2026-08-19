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
      <div className="bg-slate-900 text-white px-8 py-8 border-b-8 border-indigo-500 flex flex-col items-start justify-center gap-2">
        <div className="w-full flex justify-between items-start gap-4">
          <div className="flex-1 flex gap-5 items-center">
            {data.photo && (
              <img src={data.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400 shrink-0" />
            )}
            <div>
              <h1 className="text-3xl font-extrabold uppercase tracking-widest text-white mb-1 break-words leading-tight">
                {data.name || 'JOHN DOE'}
              </h1>
              <h2 className="text-sm font-medium text-indigo-300 tracking-wide uppercase break-words">
                {data.title || 'Professional Title'}
              </h2>
            </div>
          </div>
          <div className="text-right text-xs text-slate-300 font-medium space-y-1.5 min-w-[140px] max-w-[250px] break-words">
            {data.email && <div><span>{data.email}</span></div>}
            {data.phone && <div><span>{data.phone}</span></div>}
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Layout */}
      <div className="flex" style={{ minHeight: 'calc(11in - 130px)' }}>
        
        {/* Left Column (Main Content) */}
        <div className="w-2/3 p-8 pr-6 border-r border-slate-200">
          
          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-base font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-indigo-500 inline-block rounded-sm"></span> Profile
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
              {data.summary || 'A highly motivated professional with a passion for delivering exceptional results. Proven ability to work collaboratively in fast-paced environments.'}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-base font-bold uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-indigo-500 inline-block rounded-sm"></span> Experience
            </h3>
            
            <div className="mb-5 relative pl-4 border-l-2 border-indigo-200">
              <div className="absolute w-2.5 h-2.5 bg-indigo-500 rounded-full -left-[6px] top-1.5 border-2 border-white"></div>
              <div className="flex justify-between items-start mb-0.5">
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-slate-900 text-[14px] leading-tight break-words">{data.company || 'Company Name'}</h4>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded tracking-wider uppercase whitespace-nowrap">{data.duration || 'Date Range'}</span>
              </div>
              <div className="text-xs font-medium text-slate-500 mb-1.5 italic">Previous Role</div>
              <p className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                {data.experience || '• Contributed to key projects and delivered results.\n• Collaborated with cross-functional teams.'}
              </p>
            </div>
            
            {/* Placeholder for visual layout depth if user hasn't added much */}
            {!data.experience && (
              <div className="mb-4 relative pl-4 border-l-2 border-slate-200">
                <div className="absolute w-2.5 h-2.5 bg-slate-300 rounded-full -left-[6px] top-1.5 border-2 border-white"></div>
                <h4 className="font-bold text-slate-400 text-[14px] mb-0.5">Previous Company</h4>
                <p className="text-[13px] leading-relaxed text-slate-400">Additional experience entries will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-1/3 p-8 pl-6 bg-slate-50">
          
          {/* Education */}
          <div className="mb-8">
            <h3 className="text-base font-bold uppercase tracking-widest text-slate-900 mb-3 border-b-2 border-indigo-200 pb-1.5">
              Education
            </h3>
            <div>
              <h4 className="font-bold text-slate-800 text-[13px] leading-tight mb-1">{data.degree || 'Degree Name'}</h4>
              <p className="text-xs text-slate-600 leading-snug">{data.education || 'University Name'}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-widest text-slate-900 mb-3 border-b-2 border-indigo-200 pb-1.5">
              Expertise
            </h3>
            <div className="flex flex-col gap-2">
              {data.skills ? data.skills.split(',').map((skill, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
                  <span className="text-[13px] font-medium text-slate-700 leading-snug">
                    {skill.trim()}
                  </span>
                </div>
              )) : (
                <>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="text-[13px] text-slate-400">Skill 1</span></div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="text-[13px] text-slate-400">Skill 2</span></div>
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
