import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { articles } from '../data/articles';

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const latestArticles = articles.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % latestArticles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [latestArticles.length]);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 dark:from-red-600 dark:to-red-500 text-white overflow-hidden rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="bg-slate-900 dark:bg-black px-6 py-3 flex items-center gap-2 flex-shrink-0">
          <Zap className="w-5 h-5 fill-current animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-sm">Breaking News</span>
        </div>
        <div className="flex-1 py-3 px-6 overflow-hidden">
          <div className="animate-fade-in">
            <p className="font-medium text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
              {latestArticles[currentIndex]?.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
