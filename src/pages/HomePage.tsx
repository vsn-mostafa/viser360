import React, { useEffect, useState, memo } from 'react';
import { articles } from '../data/articles';
import { getAuthorById, getCategoryById } from '../data/articles';
import { initializeArticleViews, getAllArticleViews } from '../lib/viewCounter';
import { Calendar, Eye, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import FeaturedSlider from '../components/FeaturedSlider';
import FollowUs from '../components/FollowUs';
import SearchWidget from '../components/SearchWidget';

// --- Specialized Video Component to prevent Re-renders (Fixes Lag) ---
const VideoWidget = memo(() => {
  return (
    <div className="relative h-[240px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-black group transform-gpu">
      <iframe
        src="https://player.vimeo.com/video/1081235250?autoplay=1&muted=1&loop=1&background=1&app_id=122963"
        className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Featured Video"
        loading="lazy" // Improves initial page load performance
      ></iframe>
      
      {/* Overlay to prevent interaction and smooth out visuals */}
      <div className="absolute inset-0 z-10 bg-black/5 pointer-events-none rounded-2xl ring-1 ring-black/20"></div>
    </div>
  );
});

VideoWidget.displayName = 'VideoWidget';

interface HomePageProps {
  onNavigate: (page: string, articleSlug?: string) => void;
  onSearch?: (query: string) => void;
}

export default function HomePage({ onNavigate, onSearch }: HomePageProps) {
  const [loading, setLoading] = useState(true);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize views
    const articleIds = articles.map(a => a.id);
    initializeArticleViews(articleIds);
    
    // Fetch views immediately
    const views = getAllArticleViews();
    setViewsMap(views);

    // Simulate fast loading for smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getViews = (articleId: string) => {
    return viewsMap[articleId] || 0;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getGravatarUrl = (email: string) => {
    const hash = email.trim().toLowerCase();
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 font-bold text-xs">
            V360
          </div>
        </div>
      </div>
    );
  }

  // Sorting and Slicing Articles
  const popularArticles = [...articles].sort((a, b) => getViews(b.id) - getViews(a.id)).slice(0, 5);
  const featuredArticles = articles.slice(0, 5);
  const recentArticles = articles.slice(5, 8); // 3 Grid items
  const mainArticles = articles.slice(8); // List items

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* --- Breaking News Ticker --- */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <BreakingNewsTicker />
        </div>

        {/* --- Hero Section (Slider + Video/Search) --- */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Left: Featured Slider */}
          <div className="lg:col-span-2 h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
            <FeaturedSlider articles={featuredArticles} onNavigate={onNavigate} viewsMap={viewsMap} />
          </div>

          {/* Right: Widgets Column */}
          <div className="flex flex-col gap-6 h-auto lg:h-[500px]">
            
            {/* Video Widget (Optimized) */}
            <VideoWidget />

            {/* Search Widget - Fills remaining height on desktop */}
            <div className="flex-1 min-h-[140px]">
              <SearchWidget onSearch={(query) => onSearch?.(query)} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- Main Content Area (Left 2/3) --- */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Latest Stories Grid */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Latest Stories
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('article', article.slug)}
                    className="group cursor-pointer bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      {getCategoryById(article.category_id) && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/95 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wide shadow-sm backdrop-blur-sm">
                            {getCategoryById(article.category_id)?.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{getViews(article.id)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Feed List */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  More Articles
                </h2>
              </div>

              <div className="space-y-6">
                {mainArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('article', article.slug)}
                    className="group cursor-pointer bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Image Side */}
                      <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden">
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 md:hidden"></div>
                      </div>
                      
                      {/* Content Side */}
                      <div className="p-5 sm:p-7 md:w-3/5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          {getCategoryById(article.category_id) && (
                            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                              {getCategoryById(article.category_id)?.name}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {article.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-gray-400 mb-5 line-clamp-2 text-sm sm:text-base">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-auto">
                          {getAuthorById(article.author_id) && (
                            <div className="flex items-center gap-2">
                              <img
                                src={getGravatarUrl(getAuthorById(article.author_id)!.email)}
                                alt={getAuthorById(article.author_id)!.name}
                                className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700"
                              />
                              <span className="font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">
                                {getAuthorById(article.author_id)!.name}
                              </span>
                            </div>
                          )}
                          <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(article.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow Icon (Desktop Only) */}
                      <div className="hidden md:flex items-center justify-center w-12 border-l border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors">
                          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors -ml-1 group-hover:ml-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- Sidebar (Right 1/3) --- */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              
              {/* Popular Posts Widget */}
              <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Popular Posts</h3>
                </div>
                
                <div className="space-y-5">
                  {popularArticles.map((article, index) => (
                    <div
                      key={article.id}
                      onClick={() => onNavigate('article', article.slug)}
                      className="group cursor-pointer flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 relative w-12 mt-1">
                        <span className="absolute -top-3 -left-2 text-4xl font-black text-slate-100 dark:text-slate-800 z-0 select-none font-serif italic">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="relative z-10 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 mt-2 ml-1 group-hover:scale-125 transition-transform"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 leading-snug text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{getViews(article.id)}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow Us Widget */}
              <FollowUs />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
