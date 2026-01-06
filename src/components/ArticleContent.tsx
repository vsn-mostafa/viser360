import { useState, useRef } from 'react';
import { 
  ChevronDown, Copy, Check, Quote, Terminal, ImageIcon, 
  ExternalLink, AlertCircle, Info, AlertTriangle, 
  CheckCircle, Download, FileText, ThumbsUp, ThumbsDown, 
  Eye, EyeOff, Calendar, Play, Pause, Github, 
  BarChart3, AtSign, Music
} from 'lucide-react';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  const [visibleSpoilers, setVisibleSpoilers] = useState<Record<string, boolean>>({});
  
  // Audio Player State
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleSpoiler = (id: string) => {
    setVisibleSpoilers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAudio = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playingAudio === id) {
      audio.pause();
      setPlayingAudio(null);
    } else {
      // Pause others
      if (playingAudio && audioRefs.current[playingAudio]) {
        audioRefs.current[playingAudio].pause();
      }
      audio.play();
      setPlayingAudio(id);
    }
  };

  const copyToClipboard = (text: string, id: string, type: 'code' | 'text') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCodeIndex(id);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    } else {
      setCopiedTextId(id);
      setTimeout(() => setCopiedTextId(null), 2000);
    }
  };

  const getYoutubeId = (url: string) => {
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  // --- SUB-COMPONENTS (Inline) ---

  const SmartCopyBadge = ({ text, id }: { text: string, id: string }) => (
    <button
      onClick={() => copyToClipboard(text, id, 'text')}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 rounded-md bg-slate-100 dark:bg-blue-500/10 text-slate-700 dark:text-blue-400 border border-slate-200 dark:border-blue-500/20 hover:bg-blue-50 dark:hover:bg-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all align-middle text-sm group font-medium shadow-sm"
      title="Click to Copy"
    >
      <span>{text}</span>
      {copiedTextId === id ? <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-blue-400/60 group-hover:text-blue-600 dark:group-hover:text-blue-400" />}
    </button>
  );

  const SpoilerText = ({ text, id }: { text: string, id: string }) => {
    const isVisible = visibleSpoilers[id];
    return (
      <button 
        onClick={() => toggleSpoiler(id)}
        className={`inline-flex items-center gap-2 px-2 py-0.5 mx-1 rounded transition-all cursor-pointer border ${isVisible ? 'bg-transparent border-transparent text-slate-900 dark:text-white' : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-transparent select-none'}`}
      >
        <span className={isVisible ? '' : 'blur-sm'}>{text}</span>
        {isVisible ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-slate-500" />}
      </button>
    );
  };

  const Tooltip = ({ word, def }: { word: string, def: string }) => (
    <span className="relative group inline-block border-b border-dotted border-slate-400 dark:border-blue-400/50 cursor-help mx-1">
      <span className="text-blue-600 dark:text-blue-400 font-medium">{word}</span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-gray-200 text-xs rounded-lg border border-slate-200 dark:border-blue-500/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center backdrop-blur-md">
        {def}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-slate-900"></span>
      </span>
    </span>
  );

  // --- RICH TEXT PARSER ---
  const renderRichText = (text: string, keyPrefix: string) => {
    const parts = text.split(/(\[\[email:[^\]]+\]\]|\[\[c:[^\]]+\]\]|\|\|[^|]+\|\||\[\[btn:[^\]]+\]\]|\[\[def:[^\]]+\]\]|@[a-zA-Z0-9_]+)/g);
    
    return parts.map((part, index) => {
      const uniqueKey = `${keyPrefix}-${index}`;

      if (part.startsWith('[[email:') && part.endsWith(']]')) {
        return <SmartCopyBadge key={uniqueKey} text={part.replace('[[email:', '').replace(']]', '')} id={uniqueKey} />;
      }
      if (part.startsWith('[[c:') && part.endsWith(']]')) {
        return <SmartCopyBadge key={uniqueKey} text={part.replace('[[c:', '').replace(']]', '')} id={uniqueKey} />;
      }
      if (part.startsWith('||') && part.endsWith('||')) {
        return <SpoilerText key={uniqueKey} text={part.replace(/^\|\|/, '').replace(/\|\|$/, '')} id={uniqueKey} />;
      }
      if (part.startsWith('[[btn:') && part.endsWith(']]')) {
         const content = part.replace('[[btn:', '').replace(']]', '');
         const [label, url] = content.split(/:(.*)/s);
         return <a key={uniqueKey} href={url} target="_blank" className="inline-flex items-center gap-1.5 px-4 py-1.5 mx-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-semibold rounded-full transition-all no-underline shadow-lg shadow-blue-500/20">{label} <ExternalLink className="w-3 h-3" /></a>;
      }
      if (part.startsWith('[[def:') && part.endsWith(']]')) {
        const content = part.replace('[[def:', '').replace(']]', '');
        const [word, def] = content.split(/:(.*)/s);
        return <Tooltip key={uniqueKey} word={word} def={def} />;
      }
      if (part.startsWith('@')) {
        return <span key={uniqueKey} className="text-blue-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer inline-flex items-center gap-0.5"><AtSign className="w-3 h-3" />{part.substring(1)}</span>;
      }

      return <span key={uniqueKey} dangerouslySetInnerHTML={{ __html: parseInlineFormatting(part) }} />;
    });
  };

  const parseContent = () => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    const elements: JSX.Element[] = [];
    let faqCounter = 0;

    parts.forEach((part, partIndex) => {
      const trimmedPart = part.trim();
      if (!trimmedPart) return;

      // --- Mac-style Code Block ---
      if (trimmedPart.startsWith('```') && trimmedPart.endsWith('```')) {
        const match = trimmedPart.match(/^```(\w*)\n?([\s\S]*?)```$/);
        const language = match ? match[1] || 'text' : 'text';
        const codeContent = match ? match[2] : trimmedPart.replace(/^```\w*\n?/, '').replace(/```$/, '');
        const codeId = `code-${partIndex}`;

        elements.push(
          <div key={codeId} className="my-8 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-slate-200 dark:border-blue-500/20 group">
            <div className="flex items-center justify-between px-4 py-3 bg-[#2a2a2b] border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                </div>
                <div className="text-slate-400 text-xs font-mono opacity-60 uppercase flex items-center gap-1">
                   <Terminal className="w-3 h-3" /> {language}
                </div>
              </div>
              <button onClick={() => copyToClipboard(codeContent, codeId, 'code')} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10">{copiedCodeIndex === codeId ? <><Check className="w-3.5 h-3.5 text-green-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
            </div>
            <div className="p-5 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-sm leading-relaxed text-[#d4d4d4]"><code>{codeContent}</code></pre>
            </div>
          </div>
        );
        return;
      }

      const sections = part.split('\n\n');

      sections.forEach((section, sectionIndex) => {
        const trimmed = section.trim();
        if (!trimmed) return;
        const uniqueKey = `section-${partIndex}-${sectionIndex}`;

        if (trimmed === '---' || trimmed === '***') {
          elements.push(<hr key={uniqueKey} className="my-10 border-t border-slate-200 dark:border-slate-800/60" />);
          return;
        }

        // --- 1. Audio Player ---
        if (trimmed.startsWith('[[audio:') && trimmed.endsWith(']]')) {
            const url = trimmed.replace('[[audio:', '').replace(']]', '');
            const isPlaying = playingAudio === uniqueKey;
            
            elements.push(
                <div key={uniqueKey} className="my-6 p-4 rounded-xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-blue-500/20 shadow-sm flex items-center gap-4">
                    <button 
                        onClick={() => toggleAudio(uniqueKey)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                           <Music className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Listen to Article Segment
                        </p>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full ${isPlaying ? 'animate-pulse w-2/3' : 'w-0'} transition-all duration-500`}></div>
                        </div>
                    </div>
                    <audio ref={el => { if(el) audioRefs.current[uniqueKey] = el }} src={url} onEnded={() => setPlayingAudio(null)} />
                </div>
            );
            return;
        }

        // --- 2. GitHub Repo Card ---
        if (trimmed.startsWith('[[github:') && trimmed.endsWith(']]')) {
            const repo = trimmed.replace('[[github:', '').replace(']]', '');
            elements.push(
                <div key={uniqueKey} className="my-6 p-5 rounded-xl border border-slate-200 dark:border-blue-500/20 bg-white dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white flex items-center justify-between group hover:border-blue-400 dark:hover:border-blue-500/40 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-full"><Github className="w-6 h-6 text-slate-800 dark:text-white" /></div>
                        <div>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">GitHub Repository</p>
                            <h4 className="font-bold text-lg">{repo}</h4>
                        </div>
                    </div>
                    <a href={`https://github.com/${repo}`} target="_blank" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-lg hover:bg-slate-700 dark:hover:bg-blue-50 transition-colors no-underline">Star</a>
                </div>
            );
            return;
        }

        // --- 3. Skill/Progress Bar ---
        if (trimmed.startsWith('[[progress:') && trimmed.endsWith(']]')) {
            const content = trimmed.replace('[[progress:', '').replace(']]', '');
            const [title, percent] = content.split(/:(.*)/s);
            elements.push(
                <div key={uniqueKey} className="my-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-gray-300 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> {title}
                        </span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{percent}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" style={{ width: `${percent}%` }}></div>
                    </div>
                </div>
            );
            return;
        }

        // --- File Download ---
        if (trimmed.startsWith('[[file:') && trimmed.endsWith(']]')) {
            const content = trimmed.replace('[[file:', '').replace(']]', '');
            const [fileName, fileUrl] = content.split(/:(.*)/s);
            elements.push(
                <div key={uniqueKey} className="my-6 p-4 rounded-xl border border-slate-200 dark:border-blue-500/20 bg-white dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-between group hover:border-blue-400 dark:hover:border-blue-500/50 transition-colors shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg"><FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                        <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{fileName}</h4>
                            <span className="text-xs text-slate-500 dark:text-gray-400">Click to download resource</span>
                        </div>
                    </div>
                    <a href={fileUrl} download className="p-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Download className="w-5 h-5" />
                    </a>
                </div>
            );
            return;
        }

        // --- Timeline ---
        if (trimmed.startsWith('((') && trimmed.endsWith('))')) {
            const content = trimmed.replace(/^\(\(/, '').replace(/\)\)$/, '');
            const [date, event] = content.split(/:(.*)/s);
            elements.push(
                <div key={uniqueKey} className="flex gap-4 my-6 group">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-500/20"></div>
                        <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 my-1 group-last:hidden"></div>
                    </div>
                    <div className="pb-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">
                            <Calendar className="w-3.5 h-3.5" />{date.trim()}
                        </div>
                        <div className="text-slate-700 dark:text-gray-300">{renderRichText(event.trim(), uniqueKey)}</div>
                    </div>
                </div>
            );
            return;
        }

        // --- Pros & Cons ---
        if (trimmed.startsWith('++ ') || trimmed.startsWith('-- ')) {
            const isPro = trimmed.startsWith('++ ');
            const text = trimmed.substring(3);
            const bgColor = isPro ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10';
            const borderColor = isPro ? 'border-green-200 dark:border-green-500/20' : 'border-red-200 dark:border-red-500/20';
            const Icon = isPro ? ThumbsUp : ThumbsDown;
            const iconColor = isPro ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
            
            elements.push(
                <div key={uniqueKey} className={`flex gap-3 p-4 my-4 rounded-lg border ${bgColor} ${borderColor}`}>
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
                    <div className="text-slate-800 dark:text-gray-200">{renderRichText(text, uniqueKey)}</div>
                </div>
            );
            return;
        }

        // --- Callouts ---
        if (trimmed.startsWith(':::') && trimmed.endsWith(':::')) {
          const typeMatch = trimmed.match(/^:::(\w+)\s+([\s\S]*?)\s+:::$/);
          if (typeMatch) {
            const type = typeMatch[1]; const text = typeMatch[2];
            let styles = "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-200"; 
            let Icon = Info;
            let iconColor = "text-blue-600 dark:text-blue-400";
            
            if (type === 'warning') { 
                styles = "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-800 dark:text-orange-200"; 
                Icon = AlertTriangle;
                iconColor = "text-orange-600 dark:text-orange-400";
            } else if (type === 'success') { 
                styles = "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-800 dark:text-green-200"; 
                Icon = CheckCircle;
                iconColor = "text-green-600 dark:text-green-400";
            } else if (type === 'danger') { 
                styles = "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-800 dark:text-red-200"; 
                Icon = AlertCircle;
                iconColor = "text-red-600 dark:text-red-400";
            }
            
            elements.push(
                <div key={uniqueKey} className={`my-6 p-4 rounded-lg border flex gap-3 ${styles}`}>
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
                    <div className="prose-sm dark:prose-invert max-w-none">{renderRichText(text, uniqueKey)}</div>
                </div>
            );
            return;
          }
        }

        // Embeds (YouTube, Vimeo, CodePen, Social, Images, Blockquotes, Tables, FAQs)
        if (getYoutubeId(trimmed) && !trimmed.includes(' ')) { 
            const videoId = getYoutubeId(trimmed); 
            elements.push(
                <div key={uniqueKey} className="my-8 rounded-xl overflow-hidden shadow-2xl bg-black aspect-video relative border border-slate-200 dark:border-slate-700">
                    <iframe src={`https://www.youtube.com/embed/${videoId}`} title="YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute top-0 left-0 w-full h-full" />
                </div>
            ); 
            return; 
        }
        
        if (trimmed.includes('vimeo.com/') && !trimmed.includes(' ')) { 
            const videoId = getVimeoId(trimmed); 
            if (videoId) { 
                elements.push(
                    <div key={uniqueKey} className="my-8 rounded-xl overflow-hidden shadow-2xl bg-black aspect-video relative border border-slate-200 dark:border-slate-700">
                        <iframe src={`https://player.vimeo.com/video/${videoId}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute top-0 left-0 w-full h-full" />
                    </div>
                ); 
                return; 
            } 
        }
        
        if (trimmed.includes('codepen.io') && !trimmed.includes(' ')) { 
            const embedUrl = trimmed.replace('/pen/', '/embed/'); 
            elements.push(
                <div key={uniqueKey} className="my-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                    <iframe height="400" style={{ width: '100%' }} scrolling="no" title="CodePen" src={`${embedUrl}?default-tab=result&theme-id=dark`} frameBorder="no" loading="lazy" allowTransparency={true} allowFullScreen={true} />
                </div>
            ); 
            return; 
        }
        
        if (trimmed.match(/^https?:\/\/[^\s]+$/)) { 
            let icon = <ExternalLink className="w-5 h-5" />; 
            let label = "Visit Link"; 
            let colorClass = "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500/50"; 
            
            if (trimmed.includes('twitter.com') || trimmed.includes('x.com')) { 
                label = "View on X (Twitter)"; 
                colorClass = "bg-black/5 dark:bg-black/40 border-slate-300 dark:border-slate-700 hover:border-black dark:hover:border-white/50"; 
            } else if (trimmed.includes('facebook.com')) { 
                label = "View on Facebook"; 
                colorClass = "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-600"; 
            } 
            
            elements.push(
                <a key={uniqueKey} href={trimmed} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 my-6 rounded-lg border transition-all duration-300 group no-underline ${colorClass}`}>
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full shadow-sm group-hover:scale-110 transition-transform text-slate-700 dark:text-white">{icon}</div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">{label}</p>
                        <p className="text-sm text-slate-500 dark:text-gray-400 truncate">{trimmed}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white" />
                </a>
            ); 
            return; 
        }
        
        if (trimmed.startsWith('> ')) { 
            elements.push(
                <div key={uniqueKey} className="my-8 relative pl-6 sm:pl-8 py-2">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <Quote className="absolute -top-3 left-4 w-6 h-6 text-blue-500/20 fill-current rotate-180" />
                    <div className="text-xl italic text-slate-700 dark:text-gray-300 font-serif leading-relaxed">
                        {renderRichText(trimmed.replace(/^> /, ''), uniqueKey)}
                    </div>
                </div>
            ); 
            return; 
        }
        
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/); 
        if (imgMatch) { 
            elements.push(
                <div key={uniqueKey} className="my-8">
                    <div className="relative rounded-xl overflow-hidden shadow-lg group border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800">
                        <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                    {imgMatch[1] && (
                        <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-3 flex items-center justify-center gap-2 italic">
                            <ImageIcon className="w-3 h-3" /> {imgMatch[1]}
                        </p>
                    )}
                </div>
            ); 
            return; 
        }
        
        if (section.includes('|') && section.split('\n').length > 2) { 
            const lines = section.split('\n').filter(line => line.trim()); 
            if (lines.length >= 3 && lines[1].includes('---')) { 
                elements.push(renderTable(lines, uniqueKey)); 
                return; 
            } 
        }
        
        if (trimmed.includes('**Q:') || trimmed.includes('**Q :')) { 
            const faqLines = section.split('\n'); 
            const questionLine = faqLines.find(line => line.includes('**Q')) || faqLines[0]; 
            const question = questionLine.replace(/\*\*Q\s*:\s*/, '').replace(/\*\*/, '').replace(/\?/, '?').trim(); 
            const answer = faqLines.filter(line => line !== questionLine).join(' ').replace(/^A:\s*/, '').trim(); 
            const currentFaqIndex = faqCounter; 
            
            elements.push(
                <div key={uniqueKey} className="group bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-500/40 overflow-hidden my-4 shadow-sm transition-all duration-300">
                    <button onClick={() => toggleFaq(currentFaqIndex)} className="w-full flex items-start justify-between p-5 text-left bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">Q</span>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">{question}</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-transform duration-300 mt-1 ${openFaqIndex === currentFaqIndex ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === currentFaqIndex ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-5 pt-2 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-gray-300 leading-relaxed pl-12">
                            {renderRichText(answer, `${uniqueKey}-ans`)}
                        </div>
                    </div>
                </div>
            ); 
            faqCounter++; 
            return; 
        }

        elements.push(renderParagraph(section, uniqueKey));
      });
    });
    return elements;
  };

  const renderTable = (lines: string[], key: string) => {
    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(2).map(line => line.split('|').map(cell => cell.trim()).filter(cell => cell));
    
    return (
        <div key={key} className="my-8 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-gradient-to-r from-blue-600 to-cyan-600">
                        <tr>
                            {headers.map((header, i) => (
                                <th key={i} className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
                        {rows.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                {row.map((cell, j) => (
                                    <td key={j} className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300 whitespace-normal">
                                        {renderRichText(cell, `${key}-${i}-${j}`)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  const renderParagraph = (text: string, key: string) => {
    const headingMatch = text.match(/^(#{1,6})\s?(.*)/);
    if (headingMatch && !text.includes('**Q:')) {
      const level = headingMatch[1].length; const content = headingMatch[2]; const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      const styles = level === 2 ? "text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-3" : "text-xl md:text-2xl font-bold text-slate-800 dark:text-gray-100 mt-8 mb-4";
      return (
        <Tag key={key} className={styles}>
            {level === 2 && <span className="hidden md:block w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>}
            {content}
        </Tag>
      );
    }
    
    if (text.match(/^[-*]\s/m)) { 
        const items = text.split('\n').filter(line => line.match(/^[-*]\s/)); 
        return (
            <ul key={key} className="space-y-3 my-6 text-slate-700 dark:text-gray-300">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className="mt-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <div className="leading-relaxed">{renderRichText(item.replace(/^[-*]\s/, ''), `${key}-li-${i}`)}</div>
                    </li>
                ))}
            </ul>
        ); 
    }
    
    if (text.match(/^\d+\.\s/m)) { 
        const items = text.split('\n').filter(line => line.match(/^\d+\.\s/)); 
        return (
            <ol key={key} className="list-decimal list-inside space-y-3 my-6 text-slate-700 dark:text-gray-300 font-medium">
                {items.map((item, i) => (
                    <li key={i} className="pl-2 marker:text-blue-500 marker:font-bold">
                        <span className="inline-block align-top">{renderRichText(item.replace(/^\d+\.\s/, ''), `${key}-ol-${i}`)}</span>
                    </li>
                ))}
            </ol>
        ); 
    }
    
    return <p key={key} className="text-slate-700 dark:text-gray-300 leading-relaxed my-4 text-base md:text-lg">{renderRichText(text, key)}</p>;
  };

  const parseInlineFormatting = (text: string): string => {
    // Keyboard Key
    text = text.replace(/\[\[k:([^\]]+)\]\]/g, '<kbd class="px-1.5 py-0.5 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-lg dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 mx-0.5">$1</kbd>');
    text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-blue-300 font-mono text-sm border border-slate-200 dark:border-slate-700">$1</code>');
    text = text.replace(/==([^=]+)==/g, '<mark class="bg-yellow-200 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-200 px-1 rounded mx-0.5">$1</mark>');
    text = text.replace(/\*\*(?!Q:)([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4 hover:decoration-blue-500 font-medium transition-all">$1</a>');
    return text;
  };

  return <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:no-underline">{parseContent()}</div>;
}
