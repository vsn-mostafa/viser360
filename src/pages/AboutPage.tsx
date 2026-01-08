import { Zap, Target, Users, Award, BookOpen, Code2, BadgeCheck, ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps = { onNavigate: undefined }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is Viser360?',
      answer: 'Viser360 is a comprehensive technology news platform that provides 360-degree coverage of the tech world. We deliver the latest news, in-depth analysis, and expert insights on AI, blockchain, cybersecurity, and emerging technologies.'
    },
    {
      question: 'How often is content updated?',
      answer: 'We update our platform daily with fresh content. Our team of expert writers and editors work around the clock to bring you the latest tech news, analysis, and trends as they happen.'
    },
    {
      question: 'Can I contribute articles to Viser360?',
      answer: 'Yes! We welcome contributions from tech enthusiasts, industry experts, and thought leaders. Please reach out to us at mostafa@visernic.com with your article proposal and writing samples.'
    },
    {
      question: 'How can I stay updated with new articles?',
      answer: 'You can subscribe to our newsletter to receive weekly updates about our latest articles. You can also follow us on social media platforms for daily updates and engage with our community.'
    },
    {
      question: 'Is the content free to access?',
      answer: 'Yes, all content on Viser360 is completely free to access. We believe in making technology news and insights accessible to everyone without any barriers.'
    }
  ];

  const getGravatarUrl = (email: string) => {
    const hash = email.trim().toLowerCase();
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=400`;
  };

  const features = [
    {
      icon: Zap,
      title: 'Latest Tech News',
      description: 'Stay updated with breaking news and trends in technology, AI, and innovation.',
    },
    {
      icon: Target,
      title: 'In-Depth Analysis',
      description: 'Expert insights and detailed analysis of the tech industry and emerging technologies.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join discussions, share thoughts, and connect with tech enthusiasts worldwide.',
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Carefully curated articles from industry experts and thought leaders.',
    },
  ];

  const stats = [
    { label: 'Articles Published', value: '500+' },
    { label: 'Active Readers', value: '10K+' },
    { label: 'Expert Writers', value: '25+' },
    { label: 'Tech Categories', value: '15+' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-bold text-sm uppercase tracking-wider">
              About Viser360
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Viser360</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive source for technology news, insights, and analysis. We bring you 360-degree coverage of the tech world, bridging the gap between complexity and understanding.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-none hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl -z-10 rounded-full"></div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 md:p-14 border border-slate-200 dark:border-slate-700/60 shadow-xl dark:shadow-2xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl leading-relaxed">
                At Viser360, we believe in making technology accessible and understandable to everyone. Our mission is to provide comprehensive, accurate, and timely coverage of the ever-evolving tech landscape.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
                We strive to bridge the gap between complex technological concepts and everyday understanding, empowering our readers to stay informed and make better decisions in the digital age.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What We Offer</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-50 dark:bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300">
                      <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet the Founder</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
          </div>
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-md opacity-50"></div>
                <img
                  src={getGravatarUrl('mostafa@visernic.com')}
                  alt="Mostafa Niloy"
                  className="w-40 h-40 rounded-full border-4 border-white dark:border-slate-700 shadow-xl relative z-10"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full border-4 border-white dark:border-slate-700 z-20">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mostafa Niloy</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6 flex items-center justify-center md:justify-start gap-2">
                  <Code2 className="w-4 h-4" /> Founder & Chief Editor
                </p>
                <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  <p>
                    Mostafa Niloy is a passionate technologist and writer with over a decade of experience in the tech industry. With a deep understanding of emerging technologies and their impact on society, he founded Viser360 to create a platform that delivers comprehensive tech coverage to a global audience.
                  </p>
                  <p>
                    His vision is to make technology news accessible, engaging, and valuable for everyone from tech enthusiasts to industry professionals.
                  </p>
                </div>
                <div className="mt-8">
                   <a
                    href="mailto:mostafa@visernic.com"
                    className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    mostafa@visernic.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${
                      openFaqIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-700/50 mt-2">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-cyan-900 opacity-90 dark:opacity-80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          
          <div className="relative z-10 px-6 py-16 md:py-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Journey</h2>
            <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Be part of our growing community of tech enthusiasts. Stay informed, engage with content, and help shape the future of technology discourse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-0.5"
              >
                Subscribe to Newsletter <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-blue-700/50 backdrop-blur-sm text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 hover:border-white/40 transition-all"
              >
                Contribute Content
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('terms');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('privacy');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <a
              href="mailto:mostafa@visernic.com"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
