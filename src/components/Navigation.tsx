import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faHome,
  faBookOpen,
  faFolderOpen,
  faInfoCircle,
  faEnvelope,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: faHome },
    { id: 'categories', label: 'Categories', icon: faFolderOpen },
    { id: 'faq', label: 'FAQ', icon: faBookOpen },
    { id: 'about', label: 'About', icon: faInfoCircle },
    { id: 'contact', label: 'Contact', icon: faEnvelope },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- Logo Section --- */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
              <FontAwesomeIcon icon={faBookOpen} className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Viser360
            </span>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  currentPage === item.id
                    ? 'bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)] border border-blue-500/20'
                    : 'text-gray-400 hover:text-blue-400 hover:bg-white/5'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="text-xs" />
                <span>{item.label}</span>
              </button>
            ))}

            <div className="h-6 w-px bg-slate-700 mx-2" />

            {/* Theme Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300 transform hover:rotate-12"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-lg" />
            </button>
          </div>

          {/* --- Mobile Controls --- */}
          <div className="md:hidden flex items-center gap-3">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-lg" />
            </button>
            
            <button
              className="p-2 text-gray-300 hover:text-blue-400 transition-colors focus:outline-none active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown (Animated) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-blue-500/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-4 w-full px-4 py-3.5 rounded-xl transition-all duration-200 border ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-blue-400 border-blue-500/30 shadow-sm'
                      : 'text-gray-400 hover:bg-white/5 border-transparent hover:text-blue-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      currentPage === item.id ? 'bg-blue-500/20' : 'bg-slate-800'
                  }`}>
                    <FontAwesomeIcon icon={item.icon} className="text-sm" />
                  </div>
                  <span className="font-medium text-base">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
