import { useEffect, useState } from 'react';
import { categories } from '../data/categories';
import { articles, getArticlesByCategory, getAuthorById, Article } from '../data/articles';
import md5 from 'md5';

// FontAwesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faCode, 
  faMobileScreenButton, 
  faShieldHalved, 
  faCloud, 
  faLink, 
  faBuilding, 
  faNewspaper, 
  faStar,
  faFolderOpen,
  faArrowRight,
  faArrowLeft,
  faFileLines,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

interface CategoriesPageProps {
  onNavigate: (page: string, articleSlug?: string) => void;
}

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  description: string;
  article_count: number;
}

export default function CategoriesPage({ onNavigate }: CategoriesPageProps) {
  const [categoriesWithCount, setCategoriesWithCount] = useState<CategoryWithCount[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryArticles, setCategoryArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load More State
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    const categoriesData = categories.map((category) => ({
      ...category,
      article_count: articles.filter(
        (article) => article.category_id === category.id && article.published
      ).length,
    }));
    setCategoriesWithCount(categoriesData);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredArticles = getArticlesByCategory(selectedCategory);
      setCategoryArticles(filteredArticles);
      setVisibleCount(6); // Reset limit when category changes
    }
  }, [selectedCategory]);

  const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper to get Icon based on Category ID
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case '1': return faRobot;          // AI
      case '2': return faCode;           // Web Dev
      case '3': return faMobileScreenButton; // Mobile
      case '4': return faShieldHalved;   // Security
      case '5': return faCloud;          // Cloud
      case '6': return faLink;           // Blockchain
      case '7': return faBuilding;       // Visernic/Company
      case '8': return faNewspaper;      // Press
      case '9': return faStar;           // Reviews
      default: return faFolderOpen;
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin text-blue-500">
           <FontAwesomeIcon icon={faSpinner} className="text-4xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-[#0B1120] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <FontAwesomeIcon icon={faFolderOpen} className="text-blue-500 dark:text-blue-400 text-xl" />
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
              Browse by Topic
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Categories</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto md:mx-0">
            Dive into our curated collections of tech news, reviews, and insights organized for your convenience.
          </p>
        </div>

        {!selectedCategory ? (
          /* Categories Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithCount.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group cursor-pointer bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-gray-200 dark:border-blue-500/20 hover:border-blue-500 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-gradient-to-br dark:from-blue-600/20 dark:to-cyan-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon 
                      icon={getCategoryIcon(category.id)} 
                      className="text-3xl text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-white transition-colors" 
                    />
                  </div>
                  <span className="bg-gray-100 dark:bg-blue-500/10 text-gray-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-gray-200 dark:border-blue-500/20">
                    {category.article_count} {category.article_count === 1 ? 'Post' : 'Posts'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-2">
                  {category.description || 'Explore articles in this category'}
                </p>
                
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-bold group/btn">
                  <span className="mr-2">View Collection</span>
                  <FontAwesomeIcon icon={faArrowRight} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Selected Category View */
          <div className="animate-fade-in-up">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCategoryArticles([]);
                setVisibleCount(6);
              }}
              className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-fit"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to All Categories</span>
            </button>

            <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
              <div className="flex items-center gap-3 mb-2">
                 <FontAwesomeIcon 
                    icon={getCategoryIcon(selectedCategory)} 
                    className="text-3xl text-blue-600 dark:text-blue-400" 
                  />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {categoriesWithCount.find((c) => c.id === selectedCategory)?.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                 {categoriesWithCount.find((c) => c.id === selectedCategory)?.description}
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.slice(0, visibleCount).map((article, index) => {
                const author = getAuthorById(article.author_id);
                return (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('article', article.slug)}
                    className="group cursor-pointer bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-blue-500/20 hover:border-blue-500 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                         <FontAwesomeIcon icon={faFileLines} />
                         <span>Article</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          {author && (
                            <>
                              <img
                                src={getGravatarUrl(author.email)}
                                alt={author.name}
                                className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-gray-700"
                                loading="lazy"
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{author.name}</span>
                            </>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded">
                          {formatDate(article.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {categoryArticles.length > visibleCount && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 transition-all shadow-sm hover:shadow-md"
                >
                  Load More Articles
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            )}

            {categoryArticles.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-slate-800/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <FontAwesomeIcon icon={faFolderOpen} className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">No articles found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">There are no articles in this category yet.</p>
              </div>
            )}
          </div>
        )}

        {categoriesWithCount.length === 0 && (
          <div className="text-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
