import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pt-32 pb-16 overflow-hidden relative">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-red-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

      <div className="text-center w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl relative z-10 transition-all duration-300 hover:shadow-blue-500/5">
        
        {/* Animated 404 Circle */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 sm:mb-10 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-[spin_3s_linear_infinite]"></div>
          
          {/* Inner Circle with Glow */}
          <div className="absolute inset-4 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]">
             <div className="text-center">
                <span className="block text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">404</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Error</span>
             </div>
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          Page Not Found
        </h1>
        
        {/* Description Text */}
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-600/25 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Search Hint */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800/50">
            <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Try searching for the article instead
            </p>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
