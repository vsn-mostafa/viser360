import { useState } from 'react';
import { Search } from 'lucide-react';

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

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 shadow-2xl h-full flex flex-col justify-center">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">Search Articles</h3>
        <p className="text-gray-400 text-sm">Find articles by title or category</p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter keywords..."
            className="w-full bg-slate-800/50 text-white placeholder-gray-500 px-6 py-4 pr-14 rounded-lg border-2 border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {['AI', 'Blockchain', 'Cybersecurity', 'Visernic'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchQuery(tag);
              onSearch(tag);
            }}
            className="px-3 py-1 bg-slate-800/50 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 rounded-full text-xs font-medium transition-all border border-slate-700 hover:border-blue-500"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
