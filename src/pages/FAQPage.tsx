import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faCircleQuestion, 
  faNewspaper, 
  faUserGear, 
  faMicrochip, 
  faShieldHalved, 
  faEnvelope,
  faSearch,
  faBolt
} from '@fortawesome/free-solid-svg-icons';

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

export default function FAQPage({ onNavigate }: FAQPageProps = { onNavigate: undefined }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqCategories = [
    {
      id: 'general',
      category: 'General',
      icon: faCircleQuestion,
      color: 'text-blue-500',
      faqs: [
        {
          question: 'What is Viser360?',
          answer: 'Viser360 is a comprehensive technology news platform that provides 360-degree coverage of the tech world. We deliver the latest news, in-depth analysis, and expert insights on AI, blockchain, cybersecurity, cloud computing, and emerging technologies.'
        },
        {
          question: 'How often is content updated?',
          answer: 'We update our platform daily with fresh content. Our team of expert writers and editors work around the clock to bring you the latest tech news, analysis, and trends as they happen.'
        },
        {
          question: 'Is the content free to access?',
          answer: 'Yes, all content on Viser360 is completely free to access. We believe in making technology news and insights accessible to everyone without any barriers or paywalls.'
        }
      ]
    },
    {
      id: 'contributing',
      category: 'Contributing',
      icon: faNewspaper,
      color: 'text-emerald-500',
      faqs: [
        {
          question: 'Can I contribute articles to Viser360?',
          answer: 'Yes! We welcome contributions from tech enthusiasts, industry experts, and thought leaders. Please reach out to us at mostafa@visernic.com with your article proposal and writing samples.'
        },
        {
          question: 'What are the requirements for guest articles?',
          answer: 'Guest articles should be original, well-researched (1000-2000 words), and relevant. We prefer articles with examples, case studies, or practical applications.'
        },
        {
          question: 'Do you pay for contributed content?',
          answer: 'Currently, we operate on a contributor basis where writers receive attribution and exposure. We are exploring paid opportunities for regular contributors.'
        }
      ]
    },
    {
      id: 'account',
      category: 'Account & Subscriptions',
      icon: faUserGear,
      color: 'text-purple-500',
      faqs: [
        {
          question: 'How can I stay updated with new articles?',
          answer: 'You can subscribe to our newsletter, follow us on social media, or enable browser notifications to get instant alerts when we publish new content.'
        },
        {
          question: 'Can I customize my content preferences?',
          answer: 'Yes! Once you create an account, you can customize your content preferences by selecting your favorite categories to tailor our recommendations.'
        },
        {
          question: 'How do I unsubscribe from the newsletter?',
          answer: 'Every newsletter email includes an unsubscribe link at the bottom. Simply click it to manage your subscription preferences instantly.'
        }
      ]
    },
    {
      id: 'technical',
      category: 'Technical',
      icon: faMicrochip,
      color: 'text-amber-500',
      faqs: [
        {
          question: 'Why am I experiencing slow loading times?',
          answer: 'Slow loading times can be caused by your internet connection or browser cache. Try clearing your cache or switching browsers. If the problem persists, please contact us.'
        },
        {
          question: 'Which browsers are supported?',
          answer: 'Viser360 works best on modern browsers including Chrome, Firefox, Safari, and Edge. We support all major mobile browsers on iOS and Android.'
        },
        {
          question: 'Can I access Viser360 on mobile devices?',
          answer: 'Absolutely! Our website is fully responsive and optimized for mobile devices, smartphones, and tablets.'
        }
      ]
    },
    {
      id: 'privacy',
      category: 'Privacy & Security',
      icon: faShieldHalved,
      color: 'text-rose-500',
      faqs: [
        {
          question: 'How is my personal data protected?',
          answer: 'We take data security seriously. All data is encrypted using SSL/TLS. We never sell your personal information to third parties and comply with GDPR regulations.'
        },
        {
          question: 'What cookies does Viser360 use?',
          answer: 'We use essential cookies for site functionality and analytics to understand usage patterns. We do not use cookies for aggressive advertising purposes.'
        },
        {
          question: 'Can I request deletion of my data?',
          answer: 'Yes, you can request deletion of your personal data at any time by contacting us. We process such requests within 30 days.'
        }
      ]
    }
  ];

  // Filter logic for search
  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(f => 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.faqs.length > 0);

  let globalIndex = 0;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 backdrop-blur-sm">
            <span className="px-3 py-1 text-xs font-bold tracking-wide text-blue-600 dark:text-blue-400 uppercase rounded-full">
              <FontAwesomeIcon icon={faBolt} className="mr-2" />
              Support Center
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Questions</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Everything you need to know about Viser360. Support, functionality, and features explained.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-lg shadow-blue-500/5 dark:shadow-none transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Categories & FAQs */}
        <div className="space-y-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-slate-900/40 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800/60"
              >
                <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className={`w-12 h-12 rounded-2xl ${category.color} bg-current/10 flex items-center justify-center text-xl`}>
                    <FontAwesomeIcon icon={category.icon} className={category.color} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const currentIndex = globalIndex++;
                    const isOpen = openFaqIndex === currentIndex;

                    return (
                      <div
                        key={faqIndex}
                        className={`rounded-xl transition-all duration-300 overflow-hidden border ${
                          isOpen 
                            ? 'bg-blue-50/50 dark:bg-slate-800/60 border-blue-200 dark:border-blue-500/30 shadow-sm' 
                            : 'bg-slate-50 dark:bg-slate-800/20 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(currentIndex)}
                          className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                        >
                          <h3 className={`font-semibold text-lg pr-8 transition-colors ${
                            isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'
                          }`}>
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <FontAwesomeIcon 
                              icon={faChevronDown} 
                              className={`w-4 h-4 ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} 
                            />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <div className="px-5 pb-5 pt-0">
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No matching results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Contact Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-blue-500/20">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 dark:bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h2>
              <p className="text-blue-100 dark:text-blue-200 mb-8 max-w-xl mx-auto text-lg">
                Can't find the answer you're looking for? Our support team is here to help you around the clock.
              </p>
              <a
                href="mailto:mostafa@visernic.com"
                className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
