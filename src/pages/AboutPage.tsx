import { useState } from 'react';
import md5 from 'md5';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, 
  faBullseye, 
  faUsers, 
  faAward, 
  faBookOpen, 
  faCode, 
  faCheckCircle, 
  faChevronDown,
  faNewspaper,
  faGlobe,
  faRocket,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, 
  faTwitter, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps = { onNavigate: undefined }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=400`;
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const faqs = [
    {
      question: 'What is Viser360?',
      answer: 'Viser360 is a premier technology intelligence platform providing 360-degree coverage of the global tech ecosystem. We specialize in AI, blockchain, cybersecurity, and future tech trends.'
    },
    {
      question: 'How frequent are the updates?',
      answer: 'Our editorial team publishes real-time updates and daily comprehensive analysis. We ensure you are always ahead of the curve with the latest technological breakthroughs.'
    },
    {
      question: 'Can I contribute to Viser360?',
      answer: 'Absolutely. We value diverse perspectives. Industry experts and tech enthusiasts are encouraged to submit proposals to our editorial team at mostafa@visernic.com.'
    },
    {
      question: 'Is the content accessible for free?',
      answer: 'Yes, we believe knowledge should be democratized. All our premium articles, whitepapers, and daily news coverage are accessible without a paywall.'
    }
  ];

  const features = [
    {
      icon: faNewspaper,
      title: 'Breaking Tech News',
      description: 'Real-time coverage of global technology events and product launches.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: faShieldHalved,
      title: 'Deep Analysis',
      description: 'In-depth research and expert perspectives on security and enterprise tech.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: faUsers,
      title: 'Global Community',
      description: 'Connect with a network of developers, CIOs, and tech enthusiasts.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: faAward,
      title: 'Curated Excellence',
      description: 'Award-winning journalism and technical writing you can trust.',
      color: 'from-emerald-500 to-green-500'
    },
  ];

  const stats = [
    { label: 'Articles Published', value: '500+', icon: faBookOpen },
    { label: 'Monthly Readers', value: '10K+', icon: faGlobe },
    { label: 'Expert Writers', value: '25+', icon: faCode },
    { label: 'Tech Niches', value: '15+', icon: faRocket },
  ];

  return (
    <div className="min-h-screen pt-16 selection:bg-blue-500/30">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-[100px] rounded-full -z-10"></div>
          
          <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-slate-800/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-500/30 shadow-lg shadow-blue-500/10">
            <FontAwesomeIcon icon={faBolt} className="text-yellow-400 text-sm" />
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">
              The Future of Tech
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">Viser360</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Your definitive source for technology intelligence. We decode the complex world of innovation into actionable insights.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <FontAwesomeIcon icon={stat.icon} className="text-blue-400 text-xl" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div variants={itemVariants} className="mb-24 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50"></div>
          <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 p-8 md:p-16 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Mission & Vision
                </h2>
                <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-8"></div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  At Viser360, we are driven by the belief that technology is the greatest enabler of human potential. Our mission is to bridge the gap between complex technological innovations and practical understanding.
                </p>
                <ul className="space-y-4">
                  {[
                    'Democratizing tech knowledge',
                    'Fostering global innovation communities',
                    'Providing unbiased, data-driven analysis'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-gray-300">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-[80px] opacity-20 rounded-full"></div>
                <div className="bg-slate-900/80 border border-slate-700 p-8 rounded-2xl relative">
                  <FontAwesomeIcon icon={faBullseye} className="text-6xl text-blue-500 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Precision in Every Byte</h3>
                  <p className="text-gray-400">
                    We don't just report news; we analyze impact. Our editorial standards ensure accuracy, depth, and relevance in every story we publish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Viser360?</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-2 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Founder Section */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-blue-500/20 shadow-2xl overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-70 blur group-hover:opacity-100 transition duration-500"></div>
                <img
                  src={getGravatarUrl('mostafa@visernic.com')}
                  alt="Mostafa Niloy"
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-900 shadow-xl"
                />
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full border-4 border-slate-900">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                  <h3 className="text-3xl font-bold text-white">Mostafa Niloy</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-500/20">
                    Founder & Chief Editor
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  "Technology without humanity is just machinery. My vision for Viser360 is to create a space where innovation meets insight, helping our readers navigate the digital future with confidence and clarity."
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a href="mailto:mostafa@visernic.com" className="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Contact Me</span>
                  </a>
                  <div className="flex space-x-3">
                    {[faTwitter, faGithub, faLinkedin].map((icon, i) => (
                        <button key={i} className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                            <FontAwesomeIcon icon={icon} />
                        </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
                <div
                key={index}
                className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden transition-colors hover:bg-slate-800/60"
                >
                <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FontAwesomeIcon icon={faChevronDown} className="text-blue-400" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {openFaqIndex === index && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            ))}
            </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center border border-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/90 z-0"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to Dive Deeper?</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Join thousands of tech enthusiasts who receive our weekly insights directly in their inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1">
                        Subscribe Now
                    </button>
                    <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-600 hover:border-slate-500">
                        Explore Topics
                    </button>
                </div>
            </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 font-medium">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('terms');
              }}
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              Terms of Service
            </a>
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
            <a
              href="mailto:mostafa@visernic.com"
              className="hover:text-blue-400 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
