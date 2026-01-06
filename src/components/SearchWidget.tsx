import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchWidgetProps {
  onSearch: (query: string) => void;
}

export default function SearchWidget({ onSearch }: SearchWidgetProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) onSearch(q);
  };

  return (
    <div
      className="
        relative h-full rounded-2xl p-6 md:p-8
        bg-white/5 dark:bg-slate-900/60
        backdrop-blur-xl
        border border-white/10 dark:border-slate-800
        shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]
        transition-all
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-1">
          Search Articles
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Find articles by title, topic, or category
        </p>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics, keywords…"
          className="
            w-full rounded-xl
            bg-white/80 dark:bg-slate-800/70
            text-slate-900 dark:text-white
            placeholder:text-slate-400
            px-5 py-4 pr-14
            border border-slate-200 dark:border-slate-700
            focus:border-blue-500
            focus:ring-4 focus:ring-blue-500/20
            outline-none
            transition-all
          "
        />

        <button
          type="submit"
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            inline-flex items-center justify-center
            h-10 w-10 rounded-lg
            bg-gradient-to-br from-blue-600 to-cyan-600
            text-white
            shadow-lg shadow-blue-600/30
            hover:from-blue-500 hover:to-cyan-500
            hover:scale-105
            active:scale-95
            transition-all
          "
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Quick Tags */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          Popular Searches
        </p>

        <div className="flex flex-wrap gap-2">
          {['AI', 'Blockchain', 'Cybersecurity', 'Visernic'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                onSearch(tag);
              }}
              className="
                inline-flex items-center
                rounded-full px-3 py-1.5
                text-xs font-semibold
                bg-slate-100 dark:bg-slate-800
                text-slate-600 dark:text-slate-300
                border border-slate-200 dark:border-slate-700
                hover:bg-blue-50 dark:hover:bg-blue-500/10
                hover:text-blue-600 dark:hover:text-blue-400
                hover:border-blue-500/40
                transition-all
              "
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
