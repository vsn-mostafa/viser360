import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { articles } from '../data/articles';
import { getAuthorById, getCategoryById } from '../data/articles';
import { initializeArticleViews, getAllArticleViews } from '../lib/viewCounter';
import { Calendar, Eye, Search, ArrowLeft } from 'lucide-react';
import md5 from 'md5';

interface SearchResultsPageProps {
  onNavigate: (page: string, articleSlug?: string) => void;
}

export default function SearchResultsPage({ onNavigate }: SearchResultsPageProps) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const articleIds = articles.map(a => a.id);
    initializeArticleViews(articleIds);
    const views = getAllArticleViews();
    setViewsMap(views);
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
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
  };

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = article.title.toLowerCase().includes(query);
    const category = getCategoryById(article.category_id);
    const categoryMatch = category?.name.toLowerCase().includes(query);
    const excerptMatch = article.excerpt.toLowerCase().includes(query);
    return titleMatch || categoryMatch || excerptMatch;
  });

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Search Results
            </h1>
          </div>
          <p className="text-slate-600 dark:text-gray-400">
            Found <span className="font-bold text-blue-500">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 rounded-2xl p-12 inline-block">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
              <p className="text-gray-400 mb-6">
                Try searching with different keywords or browse our categories
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Go Back Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
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
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                        {getCategoryById(article.category_id)?.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-gray-500">
                    {getAuthorById(article.author_id) && (
                      <div className="flex items-center gap-2">
                        <img
                          src={getGravatarUrl(getAuthorById(article.author_id)!.email)}
                          alt={getAuthorById(article.author_id)!.name}
                          className="w-5 h-5 rounded-full"
                          loading="lazy"
                        />
                        <span>{getAuthorById(article.author_id)!.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
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
        )}
      </div>
    </div>
  );
}
