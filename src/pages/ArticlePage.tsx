import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleBySlug,
  getAuthorById,
  getCategoryById,
  getCommentsByArticleId,
  addComment,
  Comment,
  articles
} from '../data/articles';
import { updateArticleViews } from '../lib/viewCounter';
import { Calendar, Eye, ArrowLeft, MessageCircle, Send, ChevronLeft, ChevronRight, Share2, Facebook, Dribbble, Twitter, Instagram, Linkedin, Link2, Check } from 'lucide-react';
import ArticleContent from '../components/ArticleContent';
import { generateArticleSchema } from '../utils/schemaGenerator';

interface ArticlePageProps {
  onNavigate: (page: string, articleSlug?: string) => void;
}

export default function ArticlePage({ onNavigate }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState(slug ? getArticleBySlug(slug) : null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Functions ---
  const copyToClipboard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareToInstagram = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.instagram.com/?url=${url}`, '_blank');
  };

  const shareToDribbble = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://dribbble.com/shots/new?url=${url}`, '_blank');
  };

  const getTruncatedUrl = () => {
    const url = window.location.href;
    if (url.length > 50) {
      return url.substring(0, 47) + '...';
    }
    return url;
  };

  // --- Effects ---
  useEffect(() => {
    // Scroll to top smoothly when article changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    if (slug) {
      const foundArticle = getArticleBySlug(slug);
      setArticle(foundArticle);
      if (foundArticle) {
        setComments(getCommentsByArticleId(foundArticle.id));
        const newViews = updateArticleViews(foundArticle.id);
        setViews(newViews);

        const author = getAuthorById(foundArticle.author_id);
        const category = getCategoryById(foundArticle.category_id);
        const schema = generateArticleSchema(foundArticle, newViews, author, category);

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        script.id = 'article-schema';

        const existingScript = document.getElementById('article-schema');
        if (existingScript) {
          existingScript.remove();
        }

        document.head.appendChild(script);
      }
    }

    // Simulate "Rocket Loading" - fast but noticeable transition
    setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      const scriptToRemove = document.getElementById('article-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [slug]);

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!article) return;
    setSubmitting(true);

    try {
      const newComment = addComment({
        article_id: article.id,
        ...commentForm,
      });

      setComments([newComment, ...comments]);
      setCommentForm({ author_name: '', author_email: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGravatarUrl = (email: string) => {
    const hash = email.trim().toLowerCase();
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <p className="text-slate-500 dark:text-slate-400 animate-pulse text-sm">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article not found</h2>
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-2 mx-auto font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  const author = getAuthorById(article.author_id);
  const category = getCategoryById(article.category_id);

  const currentIndex = articles.findIndex(a => a.id === article.id);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 animate-fade-in">
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </button>

        {/* Article Card */}
        <article className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          
          {/* Cover Image */}
          <div className="relative h-56 sm:h-72 md:h-96 overflow-hidden">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            {category && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  {category.name}
                </span>
              </div>
            )}
            {/* Title Overlay for Mobile/Design Impact */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
                  {article.title}
                </h1>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            
            {/* Meta Info Bar */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              {author && (
                <div className="flex items-center space-x-3">
                  <img
                    src={getGravatarUrl(author.email)}
                    alt={author.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-blue-500/20 dark:ring-blue-500/50"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">{author.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">{author.email}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span>{views} views</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mb-12">
              <ArticleContent content={article.content} />
            </div>

            {/* Author Bio Box */}
            {author && author.bio && (
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-12">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">About the Author</h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={getGravatarUrl(author.email)}
                    alt={author.name}
                    className="w-16 h-16 rounded-full ring-2 ring-white dark:ring-slate-700 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold text-lg mb-1">{author.name}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <span>Comments ({comments.length})</span>
              </h3>

              <form onSubmit={handleSubmitComment} className="mb-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Leave a Comment</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={commentForm.author_name}
                    onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                    required
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.author_email}
                    onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                    required
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <textarea
                  placeholder="Your comment..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition-all"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={getGravatarUrl(comment.author_email)}
                        alt={comment.author_name}
                        className="w-10 h-10 rounded-full ring-2 ring-slate-200 dark:ring-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-slate-900 dark:text-white font-semibold">{comment.author_name}</h5>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-400 py-8 italic bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* Share & Navigation Section */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-500" />
                  Share This Article
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={shareToFacebook} className="flex items-center gap-2 bg-blue-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-4 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Facebook className="w-4 h-4" /> <span className="text-sm font-semibold">Facebook</span>
                  </button>

                  <button onClick={shareToTwitter} className="flex items-center gap-2 bg-sky-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white px-4 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Twitter className="w-4 h-4" /> <span className="text-sm font-semibold">X</span>
                  </button>

                  <button onClick={shareToLinkedIn} className="flex items-center gap-2 bg-blue-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white px-4 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Linkedin className="w-4 h-4" /> <span className="text-sm font-semibold">LinkedIn</span>
                  </button>

                  <button onClick={shareToInstagram} className="flex items-center gap-2 bg-pink-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white px-4 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Instagram className="w-4 h-4" /> <span className="text-sm font-semibold">Insta</span>
                  </button>

                  <button onClick={copyToClipboard} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 dark:hover:text-white px-4 py-2 rounded-lg transition-all border border-slate-200 dark:border-slate-700 shadow-sm flex-1 sm:flex-none justify-center">
                    {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    <span className="text-sm font-semibold">{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <div className="hidden sm:block flex-1 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-400 truncate">{getTruncatedUrl()}</p>
                  </div>
                </div>
              </div>

              {/* Prev/Next Navigation */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
                {previousArticle ? (
                  <button
                    onClick={() => onNavigate('article', previousArticle.slug)}
                    className="group flex items-center gap-4 flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-sm text-left"
                  >
                    <div className="p-2 bg-blue-50 dark:bg-slate-900 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-slate-800 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-blue-500 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide font-bold">Previous Article</p>
                      <p className="text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {previousArticle.title}
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="flex-1 hidden sm:block"></div>
                )}

                {nextArticle ? (
                  <button
                    onClick={() => onNavigate('article', nextArticle.slug)}
                    className="group flex items-center gap-4 flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-sm text-right justify-end"
                  >
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide font-bold">Next Article</p>
                      <p className="text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {nextArticle.title}
                      </p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-slate-900 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-slate-800 transition-colors">
                        <ChevronRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ) : (
                  <div className="flex-1 hidden sm:block"></div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
