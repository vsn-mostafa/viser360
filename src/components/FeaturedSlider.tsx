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
  const featuredArticles = articles.slice(0, 5);

  useEffect(() => {
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

  return (
    <div className="relative h-full rounded-xl overflow-hidden shadow-2xl group">
      <div
        onClick={() => onNavigate('article', currentArticle.slug)}
        className="relative h-full cursor-pointer"
      >
        <img
          src={currentArticle.cover_image}
          alt={currentArticle.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {getCategoryById(currentArticle.category_id) && (
          <div className="absolute top-6 left-6">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
              {getCategoryById(currentArticle.category_id)?.name}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {currentArticle.title}
          </h2>
          <p className="text-gray-200 mb-4 line-clamp-2 text-lg">
            {currentArticle.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            {getAuthorById(currentArticle.author_id) && (
              <div className="flex items-center gap-2">
                <img
                  src={getGravatarUrl(getAuthorById(currentArticle.author_id)!.email)}
                  alt={getAuthorById(currentArticle.author_id)!.name}
                  className="w-8 h-8 rounded-full ring-2 ring-white"
                  loading="lazy"
                />
                <span className="font-medium">{getAuthorById(currentArticle.author_id)!.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentArticle.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{viewsMap[currentArticle.id] || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
