import { useEffect, useState } from 'react';
import { articles } from '../data/articles';
import { getAuthorById, getCategoryById } from '../data/articles';
import { initializeArticleViews, getAllArticleViews } from '../lib/viewCounter';
import { Calendar, Eye, TrendingUp, Clock } from 'lucide-react';
import BreakingNewsTicker from '../components/BreakingNewsTicker';
import FeaturedSlider from '../components/FeaturedSlider';
import FollowUs from '../components/FollowUs';
import SearchWidget from '../components/SearchWidget';

interface HomePageProps {
  onNavigate: (page: string, articleSlug?: string) => void;
  onSearch?: (query: string) => void;
}

export default function HomePage({ onNavigate, onSearch }: HomePageProps) {
  const [loading, setLoading] = useState(true);
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const articleIds = articles.map(a => a.id);
    initializeArticleViews(articleIds);
    const views = getAllArticleViews();
    setViewsMap(views);

    setTimeout(() => {
      setLoading(false);
    }, 300);
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
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const popularArticles = [...articles].sort((a, b) => getViews(b.id) - getViews(a.id)).slice(0, 5);
  const featuredArticles = articles.slice(0, 5);
  const recentArticles = articles.slice(5, 8);
  const mainArticles = articles.slice(8);

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BreakingNewsTicker />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 h-[500px]">
            <FeaturedSlider articles={featuredArticles} onNavigate={onNavigate} viewsMap={viewsMap} />
          </div>

          <div className="h-[500px] flex flex-col gap-4">
            <div className="h-[240px] relative rounded-xl overflow-hidden shadow-2xl bg-slate-900">
              <iframe
                src="https://player.vimeo.com/video/1081235250?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
                title="VISERNIC Featured Video"
              ></iframe>
            </div>

            <div className="h-[240px]">
              <SearchWidget onSearch={(query) => onSearch?.(query)} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></span>
                Latest Stories
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onNavigate('article', article.slug)}
                  className="group cursor-pointer bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {getCategoryById(article.category_id) && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                          {getCategoryById(article.category_id)?.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(article.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{getViews(article.id)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {mainArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onNavigate('article', article.slug)}
                  className="group cursor-pointer bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:col-span-2 p-6 flex flex-col justify-center">
                      {getCategoryById(article.category_id) && (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider mb-2">
                          {getCategoryById(article.category_id)?.name}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-gray-500">
                        {getAuthorById(article.author_id) && (
                          <div className="flex items-center gap-2">
                            <img
                              src={getGravatarUrl(getAuthorById(article.author_id)!.email)}
                              alt={getAuthorById(article.author_id)!.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{getAuthorById(article.author_id)!.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{getViews(article.id)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 sticky top-24 self-start">
            <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Popular Posts</h3>
              </div>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('article', article.slug)}
                    className="group cursor-pointer pb-4 border-b border-slate-200 dark:border-slate-800 last:border-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <span className="text-3xl font-bold text-blue-600/20 dark:text-blue-400/20">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-2 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{getViews(article.id)}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FollowUs />
          </div>
        </div>
      </div>
    </div>
  );
}
