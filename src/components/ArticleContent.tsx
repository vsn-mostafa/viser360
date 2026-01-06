import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const parseContent = () => {
    const sections = content.split('\n\n');
    const elements: JSX.Element[] = [];
    let faqCounter = 0;

    sections.forEach((section, sectionIndex) => {
      if (!section.trim()) return;

      // Check if it's a table
      if (section.includes('|') && section.split('\n').length > 2) {
        const lines = section.split('\n').filter(line => line.trim());
        if (lines.length >= 3 && lines[1].includes('---')) {
          elements.push(renderTable(lines, sectionIndex));
          return;
        }
      }

      // Check if it's a FAQ block
      if (section.match(/\*\*Q:/)) {
        const faqLines = section.split('\n');
        const question = faqLines[0].replace(/\*\*Q:\s*/, '').replace(/\*\*/, '').replace(/\?/, '?');
        const answer = faqLines.slice(1).join(' ').replace(/^A:\s*/, '').trim();

        const currentFaqIndex = faqCounter;
        elements.push(
          <div
            key={`faq-${currentFaqIndex}`}
            className="bg-white/80 dark:bg-slate-900/50 rounded-xl border border-blue-200 dark:border-blue-500/20 overflow-hidden my-4 sm:my-6 shadow-sm"
          >
            <button
              onClick={() => toggleFaq(currentFaqIndex)}
              className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white pr-3 sm:pr-4">{question}</h3>
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-200 ${
                  openFaqIndex === currentFaqIndex ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openFaqIndex === currentFaqIndex && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fade-in">
                <div
                  className="text-slate-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: parseInlineFormatting(answer) }}
                />
              </div>
            )}
          </div>
        );
        faqCounter++;
        return;
      }

      // Regular paragraph/heading
      elements.push(renderParagraph(section, sectionIndex));
    });

    return elements;
  };

  const renderTable = (lines: string[], key: number) => {
    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(2).map(line =>
      line.split('|').map(cell => cell.trim()).filter(cell => cell)
    );

    return (
      <div key={`table-${key}`} className="overflow-x-auto my-4 sm:my-6 rounded-lg shadow-md">
        <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900/50 dark:to-cyan-900/50">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="border border-slate-300 dark:border-slate-700 px-3 py-2 sm:px-4 sm:py-3 text-left text-white font-semibold text-xs sm:text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-800/50'}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border border-slate-300 dark:border-slate-700 px-3 py-2 sm:px-4 sm:py-3 text-slate-700 dark:text-gray-300 text-xs sm:text-sm"
                    dangerouslySetInnerHTML={{ __html: parseInlineFormatting(cell) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderParagraph = (text: string, key: number) => {
    // Check if it's a heading
    if (text.startsWith('## ')) {
      return (
        <h2 key={`h2-${key}`} className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-6 sm:mt-8 mb-3 sm:mb-4">
          {text.replace('## ', '')}
        </h2>
      );
    }
    if (text.startsWith('### ')) {
      return (
        <h3 key={`h3-${key}`} className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-4 sm:mt-6 mb-2 sm:mb-3">
          {text.replace('### ', '')}
        </h3>
      );
    }

    // Check if it's a list
    if (text.match(/^[-*]\s/m)) {
      const items = text.split('\n').filter(line => line.match(/^[-*]\s/));
      return (
        <ul key={`list-${key}`} className="list-disc list-inside space-y-2 my-3 sm:my-4 text-sm sm:text-base text-slate-700 dark:text-gray-300">
          {items.map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{ __html: parseInlineFormatting(item.replace(/^[-*]\s/, '')) }}
            />
          ))}
        </ul>
      );
    }

    return (
      <p
        key={`p-${key}`}
        className="text-slate-700 dark:text-gray-300 leading-relaxed my-3 sm:my-4 text-sm sm:text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: parseInlineFormatting(text) }}
      />
    );
  };

  const parseInlineFormatting = (text: string): string => {
    // Highlighted text ==text==
    text = text.replace(/==([^=]+)==/g, '<mark class="bg-yellow-400/40 dark:bg-yellow-400/30 text-yellow-900 dark:text-yellow-200 px-2 py-0.5 rounded font-medium">$1</mark>');

    // Bold text **text** (but not part of **Q:)
    text = text.replace(/\*\*(?!Q:)([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');

    // Links [text](url)
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium">$1</a>'
    );

    return text;
  };

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      {parseContent()}
    </div>
  );
}
