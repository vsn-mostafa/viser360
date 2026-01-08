import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // For Animations
import { HelmetProvider } from 'react-helmet-async'; // For SEO
import { SkeletonTheme } from 'react-loading-skeleton'; // For Loading States
import 'react-loading-skeleton/dist/skeleton.css'; // Skeleton CSS

import TechGridBackground from './components/TechGridBackground';
import Navigation from './components/Navigation';

// --- Lazy Load Pages (Optimized for Speed) ---
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

// --- Preloader Component (Splash Screen) ---
const Preloader = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
  >
    <div className="relative flex items-center justify-center">
      {/* Animated Rings */}
      <div className="absolute w-32 h-32 border-4 border-blue-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
      <div className="absolute w-32 h-32 border-t-4 border-blue-500 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
      
      {/* Logo Container */}
      <div className="relative w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center shadow-lg border border-slate-800 z-10">
        <img 
          src="/images/logo.svg" 
          alt="Viser360 Logo" 
          className="w-14 h-14 animate-pulse" 
        />
      </div>
    </div>
    <div className="mt-8 flex flex-col items-center gap-2">
      <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-[loading_2s_ease-in-out]"></div>
      </div>
    </div>
    <style>{`
      @keyframes loading {
        0% { width: 0% }
        100% { width: 100% }
      }
    `}</style>
  </motion.div>
);

// --- Route Transition Loader (Minimal) ---
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

// --- Page Animation Wrapper (Reusable) ---
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  // Handle Splash Screen (2 Seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Optimized Smooth Scroll to Top on Route Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // 'instant' prevents laggy scroll animation on page load
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

  // Show Preloader strictly for the first 2 seconds
  if (showSplash) {
    return (
      <AnimatePresence>
        <Preloader />
      </AnimatePresence>
    );
  }

  return (
    <HelmetProvider>
      <SkeletonTheme baseColor="#1e293b" highlightColor="#334155">
        <div className="min-h-screen bg-slate-950 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col font-sans">
          <TechGridBackground />
          <Navigation currentPage={getCurrentPage()} onNavigate={handleNavigate} />
          
          <main className="relative z-10 flex-grow">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageWrapper><HomePage onNavigate={handleNavigate} onSearch={handleSearch} /></PageWrapper>} />
                  <Route path="/article/:slug" element={<PageWrapper><ArticlePage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="/search" element={<PageWrapper><SearchResultsPage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="/categories" element={<PageWrapper><CategoriesPage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="/faq" element={<PageWrapper><FAQPage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><AboutPage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
                  <Route path="/terms" element={<PageWrapper><TermsPage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="/privacy" element={<PageWrapper><PrivacyPage onNavigate={handleNavigate} /></PageWrapper>} />
                  <Route path="*" element={<PageWrapper><NotFoundPage onNavigate={handleNavigate} /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          <footer className="relative z-10 border-t border-slate-200 dark:border-blue-500/20 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md mt-auto">
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
      </SkeletonTheme>
    </HelmetProvider>
  );
}

export default App;
