import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-white dark:text-white mb-4">Page Not Found</h2>
        
        <p className="text-slate-400 text-lg mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
