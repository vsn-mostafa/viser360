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

  // Smooth Scroll to Top & Data Fetching
  useEffect(() => {
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

        // SEO Schema
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
    setLoading(false);

    return () => {
      const scriptToRemove = document.getElementById('article-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
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
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article not found</h2>
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-2 mx-auto font-medium transition-colors"
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
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </button>

        {/* Main Article Card */}
        <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          
          {/* Cover Image & Category */}
          <div className="relative h-64 sm:h-80 md:h-[450px] overflow-hidden group">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            {category && (
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-blue-600/90 dark:bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md border border-white/10 uppercase tracking-wide">
                  {category.name}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-10 md:p-12">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Author & Meta Info */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              {author && (
                <div className="flex items-center space-x-3">
                  <img
                    src={getGravatarUrl(author.email)}
                    alt={author.name}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-100 dark:ring-slate-700 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-base">{author.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{author.email}</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="mb-12">
              <ArticleContent content={article.content} />
            </div>

            {/* About Author Box */}
            {author && author.bio && (
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 sm:p-8 mb-12 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start space-x-4">
                  <img
                    src={getGravatarUrl(author.email)}
                    alt={author.name}
                    className="w-16 h-16 rounded-full ring-4 ring-white dark:ring-slate-700 shadow-md object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About the Author</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-10 sm:pt-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Comments ({comments.length})</span>
              </h3>

              <form onSubmit={handleSubmitComment} className="mb-10 bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Leave a Reply</h4>
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={commentForm.author_name}
                      onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={commentForm.author_email}
                      onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Comment</label>
                  <textarea
                    placeholder="Share your thoughts..."
                    value={commentForm.content}
                    onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm resize-y min-h-[120px]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform active:scale-95"
                >
                  {submitting ? (
                    <>Posting...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post Comment
                    </>
                  )}
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-hover hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-start space-x-4">
                      <img
                        src={getGravatarUrl(comment.author_email)}
                        alt={comment.author_name}
                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 dark:ring-slate-800 object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-slate-900 dark:text-white font-bold text-base truncate pr-2">{comment.author_name}</h5>
                          <span className="text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  <MessageCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No comments yet.</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>

            {/* Share & Navigation Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mt-10">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Share This Article
                </h3>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
                  <button onClick={shareToFacebook} className="flex items-center justify-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white px-4 py-2.5 rounded-xl transition-all font-semibold text-sm">
                    <Facebook className="w-4 h-4" /> Facebook
                  </button>
                  <button onClick={shareToTwitter} className="flex items-center justify-center gap-2 bg-black/5 dark:bg-white/10 hover:bg-black dark:hover:bg-white text-slate-700 dark:text-white hover:text-white dark:hover:text-black px-4 py-2.5 rounded-xl transition-all font-semibold text-sm">
                    <Twitter className="w-4 h-4" /> X / Twitter
                  </button>
                  <button onClick={shareToLinkedIn} className="flex items-center justify-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white px-4 py-2.5 rounded-xl transition-all font-semibold text-sm">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </button>
                  <button onClick={shareToInstagram} className="flex items-center justify-center gap-2 bg-pink-500/10 hover:bg-pink-600 text-pink-600 hover:text-white px-4 py-2.5 rounded-xl transition-all font-semibold text-sm">
                    <Instagram className="w-4 h-4" /> Instagram
                  </button>
                  <button onClick={shareToDribbble} className="flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-4 py-2.5 rounded-xl transition-all font-semibold text-sm hidden sm:flex">
                    <Dribbble className="w-4 h-4" /> Dribbble
                  </button>
                  <button onClick={copyToClipboard} className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* Previous / Next Navigation */}
              <div className="grid sm:grid-cols-2 gap-4">
                {previousArticle ? (
                  <button
                    onClick={() => onNavigate('article', previousArticle.slug)}
                    className="group relative flex flex-col p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all text-left overflow-hidden"
                  >
                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                       <ChevronLeft className="w-3 h-3" /> Previous
                     </div>
                     <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                       {previousArticle.title}
                     </h4>
                  </button>
                ) : <div />}

                {nextArticle ? (
                  <button
                    onClick={() => onNavigate('article', nextArticle.slug)}
                    className="group relative flex flex-col p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all text-right overflow-hidden items-end"
                  >
                     <div className="absolute top-0 right-0 w-1 h-full bg-blue-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                       Next <ChevronRight className="w-3 h-3" />
                     </div>
                     <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                       {nextArticle.title}
                     </h4>
                  </button>
                ) : <div />}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
