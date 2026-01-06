import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TechGridBackground from './components/TechGridBackground';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 text-slate-900 dark:text-white">
      <TechGridBackground />
      <Navigation currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      <main className="relative z-10">
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
        </Routes>
      </main>
      <footer className="relative z-10 border-t border-slate-200 dark:border-blue-500/20 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} Viser360. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 mb-2 text-sm">
              <button
                onClick={() => handleNavigate('privacy')}
                className="text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-slate-400 dark:text-gray-600">•</span>
              <button
                onClick={() => handleNavigate('terms')}
                className="text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </button>
            </div>
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
