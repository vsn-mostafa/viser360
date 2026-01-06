import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';

interface SearchWidgetProps {
  onSearch: (query: string) => void;
}

export default function SearchWidget({ onSearch }: SearchWidgetProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const trendingTags = ['AI', 'Blockchain', 'Cybersecurity', 'Web3', 'IoT'];

  return (
    <div className="h-full flex flex-col justify-center bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden group">
      {/* Decorative Gradient Blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/30 transition-all duration-500"></div>

      <div className="mb-6 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          Search Articles
        </h3>
        <p className="text-slate-400 text-sm sm:text-base">
          Explore the future of technology
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full">
        <div className="relative group/input">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type keywords (e.g., AI, Crypto)..."
            className="w-full bg-slate-900/50 text-white placeholder-slate-500 pl-11 pr-14 py-3 sm:py-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner text-sm sm:text-base"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white p-2 sm:p-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>

      <div className="mt-6 relative z-10">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <TrendingUp className="w-3 h-3" />
          <span>Trending Topics</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                onSearch(tag);
              }}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-700/50 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 border border-slate-600/50 hover:border-blue-500/50 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
