import { useEffect, useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react'; // ArrowRight added for better UX
import { articles } from '../data/articles';
import { Link } from 'react-router-dom'; // Using Link to make it clickable

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const latestArticles = articles.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % latestArticles.length);
    }, 5000); // Increased slightly for better readability

    return () => clearInterval(interval);
  }, [latestArticles.length]);

  const currentArticle = latestArticles[currentIndex];

  return (
    <div className="w-full mb-6">
      <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row">
        
        {/* Label Badge */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-between sm:justify-start gap-2 flex-shrink-0 relative overflow-hidden z-10">
          <div className="flex items-center gap-2 relative z-10">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap">Breaking</span>
          </div>
          
          {/* Decorative shine effect on badge */}
          <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer"></div>
        </div>

        {/* Ticker Content */}
        <div className="flex-1 py-2 px-4 sm:py-3 sm:px-6 flex items-center overflow-hidden bg-slate-50 dark:bg-transparent relative">
           <div className="w-full animate-fade-in flex items-center justify-between gap-4">
             <Link 
               to={`/article/${currentArticle?.slug}`} 
               className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
             >
               {currentArticle?.title}
             </Link>
             
             {/* Indicator Dots for Desktop */}
             <div className="hidden md:flex gap-1.5 flex-shrink-0">
               {latestArticles.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-red-500' : 'w-1.5 bg-slate-300 dark:bg-slate-600'}`}
                   aria-label={`Go to news ${idx + 1}`}
                 />
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
