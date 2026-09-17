import React, { useState } from 'react';
import { X, LogIn, Mail } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onGoogleLogin }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleClick = () => {
    setIsLoading(true);
    // Fake loading for UI until Firebase is connected
    setTimeout(() => {
      onGoogleLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 relative">
        
        {/* Decorative background glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="p-6 flex justify-end relative z-10">
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-10 text-center relative z-10 flex-1 flex flex-col justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mb-8 text-sm">Sign in to save your resumes to the cloud and access them from anywhere.</p>

          <button 
            onClick={handleGoogleClick}
            disabled={isLoading}
            className="w-full relative group overflow-hidden rounded-xl p-[1px] mb-4"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_auto] animate-gradient" />
            <div className="relative bg-slate-950 px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all group-hover:bg-slate-900">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span className="font-bold text-white text-sm">
                {isLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </div>
          </button>

          <p className="text-xs text-slate-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
