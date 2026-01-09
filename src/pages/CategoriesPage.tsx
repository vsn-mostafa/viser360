import { useEffect, useState } from 'react';
import { categories } from '../data/categories';
import { articles, getArticlesByCategory, getAuthorById, Article } from '../data/articles';
import { FolderOpen, FileText, ArrowRight } from 'lucide-react';
import md5 from 'md5';

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

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <FolderOpen className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Browse by Topic
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Explore tech news organized by categories and find what interests you most.
          </p>
        </div>

        {!selectedCategory ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithCount.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all hover:transform hover:-translate-y-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FolderOpen className="w-7 h-7 text-white" />
                  </div>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {category.article_count} {category.article_count === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {category.description || 'Explore articles in this category'}
                </p>
                <div className="flex items-center text-blue-400 text-sm font-semibold">
                  <span className="group-hover:mr-2 transition-all">View Articles</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCategoryArticles([]);
              }}
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Categories</span>
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {categoriesWithCount.find((c) => c.id === selectedCategory)?.name} Articles
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.map((article, index) => {
                const author = getAuthorById(article.author_id);
                return (
                  <div
                    key={article.id}
                    onClick={() => onNavigate('article', article.slug)}
                    className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all hover:transform hover:-translate-y-2 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          {author && (
                            <>
                              <img
                                src={getGravatarUrl(author.email)}
                                alt={author.name}
                                className="w-6 h-6 rounded-full"
                                loading="lazy"
                              />
                              <span className="text-gray-400">{author.name}</span>
                            </>
                          )}
                        </div>
                        <span>{formatDate(article.created_at)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {categoryArticles.length === 0 && (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No articles in this category yet.</p>
              </div>
            )}
          </div>
        )}

        {categoriesWithCount.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
