import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import { Article } from '../data/articles';
import { getAuthorById, getCategoryById } from '../data/articles';

interface FeaturedSliderProps {
  articles: Article[];
  onNavigate: (page: string, articleSlug?: string) => void;
  viewsMap: Record<string, number>;
}

export default function FeaturedSlider({ articles, onNavigate, viewsMap }: FeaturedSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Ensure we don't break if articles array is empty
  const featuredArticles = articles ? articles.slice(0, 5) : [];

  useEffect(() => {
    if (featuredArticles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);

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
    <div className="relative h-[400px] sm:h-[450px] lg:h-full w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group bg-slate-900">
      {/* Main Slide Content */}
      <div
        onClick={() => onNavigate('article', currentArticle.slug)}
        className="relative h-full w-full cursor-pointer"
      >
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={currentArticle.id} // Key change triggers animation reset
            src={currentArticle.cover_image}
            alt={currentArticle.title}
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105 animate-fade-in"
            loading="lazy"
          />
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-40"></div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg border border-blue-500/30">
              {category.name}
            </span>
          </div>
        )}

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2 drop-shadow-sm group-hover:text-blue-400 transition-colors">
            {currentArticle.title}
          </h2>
          
          <p className="text-slate-200 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base md:text-lg opacity-90 hidden sm:block">
            {currentArticle.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-300 font-medium">
            {author && (
              <div className="flex items-center gap-2">
                <img
                  src={getGravatarUrl(author.email)}
                  alt={author.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-white/20"
                  loading="lazy"
                />
                <span className="text-white">{author.name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              <span>{formatDate(currentArticle.created_at)}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              <span>{viewsMap[currentArticle.id] || 0} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Arrows) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white p-2 sm:p-3 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white p-2 sm:p-3 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2 z-20">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-500 w-6 sm:w-8' 
                : 'bg-white/30 hover:bg-white/50 w-1.5 sm:w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
