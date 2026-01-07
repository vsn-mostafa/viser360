import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import TechGridBackground from './components/TechGridBackground';
import Navigation from './components/Navigation';

// --- Lazy Load Pages (Code Splitting for High Performance) ---
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

// --- Components ---

// 1. Global Suspense Loader (Small spinner for page transitions)
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  </div>
);

// 2. Homepage Exclusive Splash Screen (Futuristic & Realistic)
const HomePreloader = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl transition-all duration-500">
    <div className="relative">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>
      
      {/* Spinner Container */}
      <div className="relative flex flex-col items-center justify-center gap-6 p-8">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-cyan-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-t-purple-500 border-l-transparent border-b-transparent border-r-transparent rounded-full animate-spin reverse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-2xl font-bold text-white tracking-tighter">V<span className="text-blue-500">360</span></span>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-blue-400 font-medium tracking-[0.2em] text-sm animate-pulse">INITIALIZING</span>
          <div className="h-1 w-32 bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-full animate-progress origin-left"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHomeLoading, setIsHomeLoading] = useState(false);

  // --- Logic: Scroll to Top & Homepage Preloader ---
  useEffect(() => {
    // 1. Smooth Scroll
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Handle Homepage Preloader (2 Seconds)
    if (location.pathname === '/') {
      setIsHomeLoading(true);
      const timer = setTimeout(() => {
        setIsHomeLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsHomeLoading(false);
    }
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
    // "flex flex-col" ensures the footer sits at the bottom properly without huge gaps
    <div className="flex flex-col min-h-screen bg-slate-950 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 font-sans">
      
      {/* Background stays persistent */}
      <TechGridBackground />

      {/* Show Homepage Preloader Overlay if on Home and Loading */}
      {isHomeLoading && <HomePreloader />}

      {/* Navigation */}
      <Navigation currentPage={getCurrentPage()} onNavigate={handleNavigate} />

      {/* Main Content Area: Flex-grow pushes footer down, minimal spacing issues */}
      <main className="flex-grow relative z-10 w-full">
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

      {/* Footer: Optimized padding for mobile/desktop */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-blue-500/20 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-gray-400 mb-2 font-medium">
              &copy; {new Date().getFullYear()} Viser360. All rights reserved.
            </p>
            <p className="text-slate-500 dark:text-gray-500 text-xs sm:text-sm">
              Built by Mostafa Niloy | Tech News Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
