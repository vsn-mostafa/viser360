import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

export default function FAQPage({ onNavigate }: FAQPageProps = { onNavigate: undefined }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqCategories = [
    {
      category: 'General',
      faqs: [
        {
          question: 'What is Viser360?',
          answer: 'Viser360 is a comprehensive technology news platform that provides 360-degree coverage of the tech world. We deliver the latest news, in-depth analysis, and expert insights on AI, blockchain, cybersecurity, cloud computing, and emerging technologies.'
        },
        {
          question: 'How often is content updated?',
          answer: 'We update our platform daily with fresh content. Our team of expert writers and editors work around the clock to bring you the latest tech news, analysis, and trends as they happen. You can expect multiple new articles each day covering various technology topics.'
        },
        {
          question: 'Is the content free to access?',
          answer: 'Yes, all content on Viser360 is completely free to access. We believe in making technology news and insights accessible to everyone without any barriers or paywalls. Our mission is to democratize tech knowledge.'
        }
      ]
    },
    {
      category: 'Contributing',
      faqs: [
        {
          question: 'Can I contribute articles to Viser360?',
          answer: 'Yes! We welcome contributions from tech enthusiasts, industry experts, and thought leaders. Please reach out to us at mostafa@visernic.com with your article proposal, writing samples, and a brief bio. We review all submissions and will get back to you within 5-7 business days.'
        },
        {
          question: 'What are the requirements for guest articles?',
          answer: 'Guest articles should be original, well-researched, and relevant to our audience. They should be between 1000-2000 words, include proper citations, and provide actionable insights. We prefer articles with examples, case studies, or practical applications.'
        },
        {
          question: 'Do you pay for contributed content?',
          answer: 'Currently, we operate on a contributor basis where writers receive attribution and exposure to our growing audience. We\'re exploring paid opportunities for regular contributors. All contributors retain rights to republish their work after 30 days.'
        }
      ]
    },
    {
      category: 'Account & Subscriptions',
      faqs: [
        {
          question: 'How can I stay updated with new articles?',
          answer: 'You can subscribe to our newsletter to receive weekly updates about our latest articles. You can also follow us on social media platforms for daily updates. Additionally, you can enable browser notifications to get instant alerts when we publish new content.'
        },
        {
          question: 'Can I customize my content preferences?',
          answer: 'Yes! Once you create an account, you can customize your content preferences by selecting your favorite categories. This will help us tailor our newsletter and recommendations to match your interests.'
        },
        {
          question: 'How do I unsubscribe from the newsletter?',
          answer: 'Every newsletter email includes an unsubscribe link at the bottom. Simply click it to manage your subscription preferences. You can choose to receive fewer emails or unsubscribe completely. Your preferences are saved instantly.'
        }
      ]
    },
    {
      category: 'Technical',
      faqs: [
        {
          question: 'Why am I experiencing slow loading times?',
          answer: 'Slow loading times can be caused by various factors including your internet connection, browser cache, or device performance. Try clearing your browser cache, disabling browser extensions, or switching to a different browser. If the problem persists, please contact us.'
        },
        {
          question: 'Which browsers are supported?',
          answer: 'Viser360 works best on modern browsers including Chrome, Firefox, Safari, and Edge (latest versions). We recommend keeping your browser updated for the best experience and security. Mobile browsers on iOS and Android are also fully supported.'
        },
        {
          question: 'Can I access Viser360 on mobile devices?',
          answer: 'Absolutely! Our website is fully responsive and optimized for mobile devices. Whether you\'re using a smartphone or tablet, you\'ll have a seamless reading experience. We\'re also working on a dedicated mobile app for iOS and Android.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      faqs: [
        {
          question: 'How is my personal data protected?',
          answer: 'We take data security seriously. All data is encrypted in transit using SSL/TLS. We never sell your personal information to third parties. For more details, please review our Privacy Policy. We comply with GDPR and other international data protection regulations.'
        },
        {
          question: 'What cookies does Viser360 use?',
          answer: 'We use essential cookies for site functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage your cookie preferences through your browser settings. We do not use cookies for advertising purposes.'
        },
        {
          question: 'Can I request deletion of my data?',
          answer: 'Yes, you have the right to request deletion of your personal data at any time. Simply contact us at mostafa@visernic.com with your request, and we\'ll process it within 30 days. Please note that some data may be retained for legal compliance purposes.'
        }
      ]
    }
  ];

  let globalIndex = 0;

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Help Center
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about Viser360. Can't find what you're looking for? Contact us at mostafa@visernic.com
          </p>
        </div>

        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.faqs.map((faq, faqIndex) => {
                const currentIndex = globalIndex++;
                return (
                  <div
                    key={faqIndex}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden hover:border-blue-500/40 transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(currentIndex)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/70 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform ${
                          openFaqIndex === currentIndex ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === currentIndex && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20 text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:mostafa@visernic.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
