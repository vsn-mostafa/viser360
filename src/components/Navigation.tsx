import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faFolderOpen, 
  faBookOpen, 
  faInfoCircle, 
  faEnvelope, 
  faSun, 
  faMoon, 
  faBars, 
  faTimes,
  faBookReader
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div
            className="flex items-center space-x-3 cursor-pointer group select-none"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-blue-500/30 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon icon={faBookReader} className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight">
              Viser360
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className={currentPage === item.id ? 'animate-pulse' : ''} />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Theme Toggle (Desktop) */}
            <div className="pl-2 ml-2 border-l border-gray-700">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300 transform hover:rotate-12"
                aria-label="Toggle theme"
              >
                <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-lg" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-colors"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-lg" />
            </button>
            
            <button
              className="p-2 text-gray-300 hover:text-white transition-colors relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-blue-500/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full space-x-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-blue-400 border border-blue-500/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentPage === item.id ? 'bg-blue-500/20' : 'bg-gray-800'
                  }`}>
                    <FontAwesomeIcon icon={item.icon} className={currentPage === item.id ? 'text-blue-400' : 'text-gray-500'} />
                  </div>
                  <span className="font-semibold text-lg">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
