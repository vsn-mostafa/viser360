import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import TechGridBackground from './components/TechGridBackground';
import Navigation from './components/Navigation';

// --- Lazy Load Pages for Faster Performance ---
const HomePage = lazy(() => import('./pages/HomePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// --- Optimized Loader Component ---
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Optimized Smooth Scroll execution
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [location.pathname]);

  const handleNavigate = (page: string, articleSlug?: string) => {
    if (page === 'article' && articleSlug) {
      navigate(`/article/${articleSlug}`);
    } else if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/article/')) return 'article';
    if (path.startsWith('/search')) return 'search';
    if (path === '/categories') return 'categories';
    if (path === '/faq') return 'faq';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    if (path === '/terms') return 'terms';
    if (path === '/privacy') return 'privacy';
    return 'home';
  };

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
      <TechGridBackground />
      <Navigation currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      
      <main className="relative z-10 flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage onNavigate={handleNavigate} onSearch={handleSearch} />} />
            <Route path="/article/:slug" element={<ArticlePage onNavigate={handleNavigate} />} />
            <Route path="/search" element={<SearchResultsPage onNavigate={handleNavigate} />} />
            <Route path="/categories" element={<CategoriesPage onNavigate={handleNavigate} />} />
            <Route path="/faq" element={<FAQPage onNavigate={handleNavigate} />} />
            <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage onNavigate={handleNavigate} />} />
            <Route path="/privacy" element={<PrivacyPage onNavigate={handleNavigate} />} />
            <Route path="*" element={<NotFoundPage onNavigate={handleNavigate} />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="relative z-10 border-t border-slate-200 dark:border-blue-500/20 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} Viser360. All rights reserved.
            </p>
            <p className="text-slate-500 dark:text-gray-500 text-sm">
              Built by Mostafa Niloy | Tech News Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
