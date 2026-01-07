import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Eye, ArrowRight } from 'lucide-react';
import { Article } from '../data/articles';
import { getAuthorById, getCategoryById } from '../data/articles';

interface FeaturedSliderProps {
  articles: Article[];
  onNavigate: (page: string, articleSlug?: string) => void;
  viewsMap: Record<string, number>;
}

export default function FeaturedSlider({ articles, onNavigate, viewsMap }: FeaturedSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredArticles = articles.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 6000); // 6 seconds for better reading time

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
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

  if (featuredArticles.length === 0) return null;

  const currentArticle = featuredArticles[currentSlide];
  const author = getAuthorById(currentArticle.author_id);
  const category = getCategoryById(currentArticle.category_id);

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 group">
      {/* Main Slide Content */}
      <div
        onClick={() => onNavigate('article', currentArticle.slug)}
        className="relative h-full w-full cursor-pointer overflow-hidden"
      >
        {/* Image Background with Zoom Effect */}
        <div className="absolute inset-0 w-full h-full">
            <img
            src={currentArticle.cover_image}
            alt={currentArticle.title}
            className="w-full h-full object-cover transition-transform duration-[1900ms] ease-out group-hover:scale-110"
            loading="lazy"
            />
            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/100 to-transparent opacity-50 sm:opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-transparent"></div>
        </div>

        {/* Category Badge - Mobile Optimized */}
        {category && (
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-lg border border-blue-400/20">
              {category.name}
            </span>
          </div>
        )}

        {/* Content Area - Bottom Aligned */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 z-20 flex flex-col justify-end h-full pointer-events-none">
          <div className="max-w-3xl transform transition-all duration-500 translate-y-0 opacity-100">
            
            {/* Title */}
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 leading-tight sm:leading-snug line-clamp-2 drop-shadow-lg">
              {currentArticle.title}
            </h2>

            {/* Excerpt - Hidden on very small screens, visible on others */}
            <p className="hidden sm:block text-gray-200 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-2 max-w-2xl font-medium text-shadow">
              {currentArticle.excerpt}
            </p>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-300 font-medium">
              {author && (
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full pr-3 pl-1 py-1 border border-white/10">
                  <img
                    src={getGravatarUrl(author.email)}
                    alt={author.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-blue-500"
                    loading="lazy"
                  />
                  <span className="text-white">{author.name}</span>
                </div>
              )}
              
              <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span>{formatDate(currentArticle.created_at)}</span>
                </div>
                <div className="w-px h-3 bg-gray-500"></div>
                <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span>{viewsMap[currentArticle.id] || 0}</span>
                </div>
              </div>
            </div>
            
             {/* Mobile "Read More" Hint */}
             <div className="mt-3 sm:hidden flex items-center gap-1 text-blue-400 text-xs font-bold animate-pulse">
                Read Article <ArrowRight className="w-3 h-3" />
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Improved Visibility */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/40 hover:bg-blue-600 text-white backdrop-blur-md border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/40 hover:bg-blue-600 text-white backdrop-blur-md border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute top-4 right-4 sm:bottom-8 sm:top-auto sm:right-8 z-30 flex gap-2">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 shadow-sm ${
              index === currentSlide 
                ? 'bg-blue-500 w-6 sm:w-8' 
                : 'bg-white/40 hover:bg-white/80 w-1.5 sm:w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
