import { useState } from 'react';
import md5 from 'md5';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faNodeJs, 
  faPython, 
  faDocker, 
  faAws, 
  faGoogle, 
  faMicrosoft, 
  faMeta 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMicrochip, 
  faShieldHalved, 
  faGlobe, 
  faRocket, 
  faCode, 
  faBolt, 
  faUsers, 
  faNewspaper,
  faChevronDown,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
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
      question: 'Can I contribute articles?',
      answer: 'Yes! We welcome contributions from tech enthusiasts. Please reach out to us at mostafa@visernic.com with your proposal.'
    }
  ];

  const features = [
    {
      icon: faBolt,
      title: 'Latest Tech News',
      description: 'Real-time updates on AI, crypto, and global innovation.',
      color: 'text-yellow-500'
    },
    {
      icon: faMicrochip,
      title: 'Deep Analysis',
      description: 'Technical breakdowns of hardware and software breakthroughs.',
      color: 'text-cyan-500'
    },
    {
      icon: faUsers,
      title: 'Community First',
      description: 'A growing ecosystem of developers and tech lovers.',
      color: 'text-green-500'
    },
    {
      icon: faNewspaper,
      title: 'Curated Content',
      description: 'High-quality articles vetted by industry experts.',
      color: 'text-purple-500'
    },
  ];

  const stats = [
    { label: 'Articles Published', value: '500+' },
    { label: 'Active Readers', value: '10K+' },
    { label: 'Expert Writers', value: '25+' },
    { label: 'Tech Categories', value: '15+' },
  ];

  const techIcons = [
    { icon: faReact, name: "React", color: "text-[#61DAFB]" },
    { icon: faNodeJs, name: "Node.js", color: "text-[#339933]" },
    { icon: faPython, name: "Python", color: "text-[#3776AB]" },
    { icon: faDocker, name: "Docker", color: "text-[#2496ED]" },
    { icon: faAws, name: "AWS", color: "text-[#FF9900]" },
    { icon: faGoogle, name: "Google Cloud", color: "text-[#4285F4]" },
    { icon: faMicrosoft, name: "Microsoft", color: "text-[#F25022]" },
    { icon: faMeta, name: "Meta", color: "text-[#0668E1]" },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header / Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-20 relative"
        >
          {/* Decorative background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl -z-10" />

          <motion.div variants={itemVariants} className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
            <span className="font-semibold text-sm uppercase tracking-wider">
              Global Tech Coverage
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            We are <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Viser360</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Navigating the digital frontier. Your definitive source for technology news, developer insights, and the future of innovation.
          </motion.p>
        </motion.div>

        {/* Stats Section with Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-200 dark:border-blue-500/20 text-center shadow-lg dark:shadow-none hover:shadow-xl transition-all"
            >
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 dark:text-gray-400 font-medium tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <div className="mb-24">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="relative bg-gradient-to-br from-white to-gray-100 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-slate-200 dark:border-blue-500/20 overflow-hidden shadow-2xl dark:shadow-blue-900/10"
          >
             <div className="absolute top-0 right-0 p-12 opacity-5 dark:opacity-10">
                <FontAwesomeIcon icon={faRocket} className="w-64 h-64 text-slate-900 dark:text-white" />
             </div>

            <div className="relative z-10 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-8"></div>
              <p className="text-slate-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                At Viser360, we believe in making technology accessible and understandable to everyone. Our mission is to bridge the gap between complex technological concepts and everyday understanding.
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                Whether you are a developer, a CTO, or a tech enthusiast, we empower you to stay informed and make better decisions in the rapidly evolving digital age.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Technologies / Topics Section (New) */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Technologies We Cover</h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {techIcons.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-700 group-hover:border-blue-500/50 transition-all group-hover:-translate-y-2">
                  <FontAwesomeIcon icon={tech.icon} className={`text-4xl ${tech.color} transition-transform group-hover:scale-110`} />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className={`w-14 h-14 bg-slate-100 dark:bg-slate-700/50 rounded-xl flex items-center justify-center mb-6`}>
                  <FontAwesomeIcon icon={feature.icon} className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-blue-500/20 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 dark:opacity-40 animate-pulse"></div>
                <LazyLoadImage
                  effect="blur"
                  src={getGravatarUrl('mostafa@visernic.com')}
                  alt="Mostafa Niloy"
                  className="w-40 h-40 rounded-full ring-4 ring-white dark:ring-blue-500/30 object-cover relative z-10"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Mostafa Niloy</h3>
                  <FontAwesomeIcon icon={faCode} className="text-blue-500 dark:text-blue-400 text-xl" />
                </div>
                <p className="text-blue-600 dark:text-blue-400 mb-6 font-semibold tracking-wide">Founder & Chief Editor</p>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                  Mostafa Niloy is a passionate technologist and writer with over a decade of experience in the tech industry. With a deep understanding of emerging technologies and their impact on society, he founded Viser360 to create a platform that delivers comprehensive tech coverage to a global audience.
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-3 mt-6">
                  <a
                    href="mailto:mostafa@visernic.com"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors font-medium"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    mostafa@visernic.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Frequent Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-blue-500/20 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} className="text-blue-500 dark:text-blue-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Abstract Circle Decoration */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Join Our Tech Community</h2>
          <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Be part of our growing ecosystem. Stay informed, engage with content, and help shape the future of technology discourse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href="#"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Subscribe Newsletter
            </a>
            <a
              href="mailto:mostafa@visernic.com"
              className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all border border-blue-400"
            >
              Become a Contributor
            </a>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-gray-400">
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
            <span className="text-slate-300 dark:text-slate-700">•</span>
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
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="mailto:mostafa@visernic.com"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
