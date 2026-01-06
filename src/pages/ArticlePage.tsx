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

  // Smooth scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

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

  useEffect(() => {
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

    // Faster loading simulation (reduced delay)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150);

    return () => {
      clearTimeout(timer);
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
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-blue-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">Article not found</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8">The article you are looking for does not exist or has been moved.</p>
          <button
            onClick={() => onNavigate('home')}
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 mx-auto"
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
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Navigation Back */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 sm:mb-8 transition-all group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </button>

        <article className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-blue-500/20 shadow-xl dark:shadow-none">
          {/* Cover Image */}
          <div className="relative h-56 sm:h-72 md:h-96 overflow-hidden">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            {category && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <span className="bg-blue-600/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md">
                  {category.name}
                </span>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Data */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700/50">
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
                    <p className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm">{author.email}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-gray-400 font-medium">
                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span>{views} views</span>
                </div>
                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mb-10 sm:mb-14">
              <ArticleContent content={article.content} />
            </div>

            {/* Author Bio Box */}
            {author && author.bio && (
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 sm:p-8 mb-10 sm:mb-14 border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">About the Author</h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={getGravatarUrl(author.email)}
                    alt={author.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-4 ring-white dark:ring-slate-800 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">{author.name}</p>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Comments & Share Section */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-10 sm:pt-14">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>Comments ({comments.length})</span>
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-10 bg-slate-50 dark:bg-slate-900/30 rounded-xl p-6 border border-slate-100 dark:border-slate-700/50">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">Leave a Comment</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={commentForm.author_name}
                    onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                    required
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.author_email}
                    onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                    required
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <textarea
                  placeholder="Your thoughts..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition-all"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={getGravatarUrl(comment.author_email)}
                        alt={comment.author_name}
                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 dark:ring-slate-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-slate-900 dark:text-white font-bold">{comment.author_name}</h5>
                          <span className="text-xs text-slate-500 dark:text-gray-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <p className="text-center text-slate-500 dark:text-gray-500 py-8 italic bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>

            {/* Share Section */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-10 mt-10">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Share This Article
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={shareToFacebook} className="flex items-center gap-2 bg-[#3b5998] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm shadow-sm">
                    <Facebook className="w-4 h-4" /> Facebook
                  </button>

                  <button onClick={shareToTwitter} className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm shadow-sm">
                    <Twitter className="w-4 h-4" /> X (Twitter)
                  </button>

                  <button onClick={shareToLinkedIn} className="flex items-center gap-2 bg-[#0077B5] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm shadow-sm">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </button>
                  
                  <button onClick={shareToInstagram} className="flex items-center gap-2 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm shadow-sm">
                    <Instagram className="w-4 h-4" /> Instagram
                  </button>

                   <button onClick={shareToDribbble} className="flex items-center gap-2 bg-[#ea4c89] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all font-medium text-sm shadow-sm">
                    <Dribbble className="w-4 h-4" /> Dribbble
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white px-4 py-2.5 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all font-medium text-sm flex-1 sm:flex-none"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> : <Link2 className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
                
                <div className="mt-4 bg-slate-100 dark:bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-gray-500 truncate mr-2">{getTruncatedUrl()}</p>
                </div>
              </div>

              {/* Next/Prev Navigation */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-8 border-t border-slate-100 dark:border-slate-700">
                {previousArticle ? (
                  <button
                    onClick={() => onNavigate('article', previousArticle.slug)}
                    className="group flex items-center gap-4 flex-1 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-sm text-left"
                  >
                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-gray-500 mb-1 font-medium uppercase tracking-wider">Previous Article</p>
                      <p className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
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
                    className="group flex items-center justify-end gap-4 flex-1 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all shadow-sm text-right"
                  >
                    <div>
                      <p className="text-xs text-slate-500 dark:text-gray-500 mb-1 font-medium uppercase tracking-wider">Next Article</p>
                      <p className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {nextArticle.title}
                      </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-blue-400" />
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
