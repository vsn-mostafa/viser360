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
// FontAwesome Icons Import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faLinkedinIn, 
  faInstagram, 
  faDribbble, 
  faWhatsapp,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCalendarAlt, 
  faEye, 
  faComment, 
  faArrowLeft, 
  faPaperPlane, 
  faShareAlt, 
  faLink, 
  faCheck, 
  faChevronLeft, 
  faChevronRight,
  faHome,
  faUser
} from '@fortawesome/free-solid-svg-icons';
// Lazy Load for Performance
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ArticleContent from '../components/ArticleContent';
import { generateArticleSchema } from '../utils/schemaGenerator';
import md5 from 'md5';

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
    // Instagram doesn't support direct link sharing via URL, redirecting to profile/home
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.instagram.com/`, '_blank');
  };

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article?.title || '');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const shareToDribbble = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://dribbble.com/shots/new?url=${url}`, '_blank');
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
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 dark:border-blue-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
        <div className="text-center max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The article you are looking for might have been removed or is temporarily unavailable.</p>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all w-full font-semibold"
          >
            <FontAwesomeIcon icon={faHome} />
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
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
            <span>All Articles</span>
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800">
          
          {/* Hero Image Section */}
          <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden group">
            <LazyLoadImage
              src={article.cover_image}
              alt={article.title}
              effect="blur"
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            
            {category && (
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-white/20">
                  {category.name}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 sm:p-10">
            {/* Article Header Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-md">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600 dark:text-blue-400" />
                <span>{formatDate(article.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-md">
                <FontAwesomeIcon icon={faEye} className="text-blue-600 dark:text-blue-400" />
                <span>{views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-md">
                <FontAwesomeIcon icon={faComment} className="text-blue-600 dark:text-blue-400" />
                <span>{comments.length} comments</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Author Section */}
            {author && (
              <div className="flex items-center p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700 mb-10">
                <LazyLoadImage
                  src={getGravatarUrl(author.email)}
                  alt={author.name}
                  effect="opacity"
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-600 shadow-sm"
                />
                <div className="ml-4">
                  <p className="text-gray-900 dark:text-white font-bold text-base">{author.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Content Creator & Tech Enthusiast</p>
                </div>
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-12 prose-img:rounded-xl prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
              <ArticleContent content={article.content} />
            </div>

            {/* Social Share Section - Enhanced */}
            <div className="border-t border-gray-200 dark:border-slate-800 pt-8 mb-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FontAwesomeIcon icon={faShareAlt} className="text-blue-600" />
                  Share this article
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <button onClick={shareToFacebook} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300" title="Facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </button>
                  <button onClick={shareToTwitter} className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" title="X (Twitter)">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </button>
                  <button onClick={shareToLinkedIn} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300" title="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </button>
                  <button onClick={shareToWhatsApp} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300" title="WhatsApp">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </button>
                  <button onClick={copyToClipboard} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`} title="Copy Link">
                    <FontAwesomeIcon icon={copied ? faCheck : faLink} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-50 dark:bg-slate-800/30 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faComment} className="text-blue-600" />
                Comments <span className="text-gray-500 text-lg font-normal">({comments.length})</span>
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-10">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-4 top-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentForm.author_name}
                      onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address (private)"
                    value={commentForm.author_email}
                    onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <textarea
                  placeholder="What are your thoughts?"
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4 resize-y"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ml-auto"
                >
                  {submitting ? 'Posting...' : (
                    <>
                      <span>Post Comment</span>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </>
                  )}
                </button>
              </form>

              {/* Comment List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm">
                      <div className="flex items-start gap-4">
                        <LazyLoadImage
                          src={getGravatarUrl(comment.author_email)}
                          alt={comment.author_name}
                          effect="opacity"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h5 className="text-gray-900 dark:text-white font-bold">{comment.author_name}</h5>
                            <span className="text-xs text-gray-500 font-medium">{formatDate(comment.created_at)}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-100 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faComment} className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next/Prev Navigation */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {previousArticle ? (
                <button
                  onClick={() => onNavigate('article', previousArticle.slug)}
                  className="group flex flex-col items-start p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left"
                >
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                     <FontAwesomeIcon icon={faChevronLeft} /> Previous Article
                   </span>
                   <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                     {previousArticle.title}
                   </h4>
                </button>
              ) : <div />}

              {nextArticle ? (
                <button
                  onClick={() => onNavigate('article', nextArticle.slug)}
                  className="group flex flex-col items-end p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-right"
                >
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                     Next Article <FontAwesomeIcon icon={faChevronRight} />
                   </span>
                   <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                     {nextArticle.title}
                   </h4>
                </button>
              ) : <div />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
