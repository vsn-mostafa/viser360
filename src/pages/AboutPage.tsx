import { Zap, Target, Users, Award, BookOpen, Code2, BadgeCheck, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Viser360</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive source for technology news, insights, and analysis. We bring you 360-degree coverage of the tech world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">Our Mission</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8"></div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-500/20">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At Viser360, we believe in making technology accessible and understandable to everyone. Our mission is to provide comprehensive, accurate, and timely coverage of the ever-evolving tech landscape.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We strive to bridge the gap between complex technological concepts and everyday understanding, empowering our readers to stay informed and make better decisions in the digital age.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">What We Offer</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all hover:transform hover:-translate-y-2 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">Meet the Founder</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-12"></div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-500/20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={getGravatarUrl('mostafa@visernic.com')}
                alt="Mostafa Niloy"
                className="w-32 h-32 rounded-full ring-4 ring-blue-500/50"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-white">Mostafa Niloy</h3>
                  <BadgeCheck className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-blue-400 mb-4 font-semibold">Founder & Chief Editor</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Mostafa Niloy is a passionate technologist and writer with over a decade of experience in the tech industry. With a deep understanding of emerging technologies and their impact on society, he founded Viser360 to create a platform that delivers comprehensive tech coverage to a global audience.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  His vision is to make technology news accessible, engaging, and valuable for everyone from tech enthusiasts to industry professionals.
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <a
                    href="mailto:mostafa@visernic.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    mostafa@visernic.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">Frequently Asked Questions</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-12"></div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/70 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 md:p-12 border border-blue-500/20 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Journey</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Be part of our growing community of tech enthusiasts. Stay informed, engage with content, and help shape the future of technology discourse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              Subscribe to Newsletter
            </a>
            <a
              href="#"
              className="bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-blue-500/20"
            >
              Contribute Content
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('terms');
              }}
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('privacy');
              }}
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="mailto:mostafa@visernic.com"
              className="hover:text-blue-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
