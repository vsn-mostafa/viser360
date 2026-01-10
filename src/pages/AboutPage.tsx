import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrochip, 
  faGlobe, 
  faShieldHalved, 
  faRocket, 
  faCode, 
  faNewspaper, 
  faUsers, 
  faEnvelope,
  faChevronDown,
  faCheckCircle,
  faLightbulb,
  faHandshake
} from '@fortawesome/free-solid-svg-icons';
import { 
  faReact, 
  faJs, 
  faPython, 
  faAws, 
  faGoogle, 
  faMeta,
  faLinkedin,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import md5 from 'md5';

// You can import these from your assets if the paths match exactly, 
// otherwise standard img tags with public paths work fine in Vite.
const techIcons = [
  { name: 'AI & Future', src: '/images/ai-future.svg' },
  { name: 'Web3', src: '/images/web3-blockchain.svg' },
  { name: 'Cybersec', src: '/images/cybersecurity.svg' },
  { name: 'Cloud', src: '/images/cloud-computing.svg' },
  { name: 'Metaverse', src: '/images/metaverse.svg' },
  { name: '5G', src: '/images/5g-network.svg' },
];

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function AboutPage({ onNavigate }: AboutPageProps = { onNavigate: undefined }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=400`;
  };

  const stats = [
    { label: 'Monthly Readers', value: '50K+', icon: faUsers },
    { label: 'Articles Published', value: '1,200+', icon: faNewspaper },
    { label: 'Global Contributors', value: '35+', icon: faGlobe },
    { label: 'Tech Niches', value: '20+', icon: faMicrochip },
  ];

  const values = [
    {
      title: 'Innovation First',
      desc: 'We prioritize groundbreaking technologies that shape the future.',
      icon: faLightbulb,
      color: 'text-yellow-400'
    },
    {
      title: 'Integrity',
      desc: 'Unbiased reporting and factual analysis you can trust.',
      icon: faCheckCircle,
      color: 'text-green-400'
    },
    {
      title: 'Community',
      desc: 'Building a global network of tech enthusiasts and experts.',
      icon: faHandshake,
      color: 'text-blue-400'
    }
  ];

  const faqs = [
    {
      question: 'What is Viser360?',
      answer: 'Viser360 is a comprehensive technology news platform providing 360-degree coverage of AI, blockchain, cybersecurity, and emerging tech trends.'
    },
    {
      question: 'How can I contribute?',
      answer: 'We welcome industry experts! Send your portfolio and topic proposals to mostafa@visernic.com. We review submissions weekly.'
    },
    {
      question: 'Is the content free?',
      answer: 'Yes, our mission is to democratize tech knowledge. All articles and resources are completely free to access.'
    },
    {
      question: 'Do you offer an API?',
      answer: 'Currently, we do not offer a public API, but we are working on a developer portal for future releases.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6 border border-blue-200 dark:border-blue-500/30">
            <FontAwesomeIcon icon={faRocket} className="text-blue-600 dark:text-blue-400" />
            <span className="text-blue-800 dark:text-blue-300 font-semibold text-sm uppercase tracking-wide">
              The Future of Tech Media
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            We Are <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Viser360</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between complex code and human understanding. We deliver 360° insights into the technologies defining tomorrow.
          </p>
        </motion.div>

        {/* STATS SECTION */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-blue-500/20 shadow-lg dark:shadow-blue-900/10 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-lg shadow-blue-500/30">
                <FontAwesomeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* TECH LANDSCAPE (Icons Grid) */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden border border-slate-700 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Technologies We Cover</h2>
              <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                From the depths of backend code to the frontiers of quantum computing, our scope is limitless.
              </p>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
                {techIcons.map((tech, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:border-cyan-500/50 transition-colors shadow-lg">
                       <img src={tech.src} alt={tech.name} className="w-10 h-10 group-hover:brightness-110 transition-all" />
                    </div>
                    <span className="text-gray-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Developer Icons Row */}
              <div className="mt-12 pt-8 border-t border-slate-800 flex justify-center gap-6 text-slate-600">
                <FontAwesomeIcon icon={faReact} className="text-2xl hover:text-[#61DAFB] transition-colors" />
                <FontAwesomeIcon icon={faJs} className="text-2xl hover:text-[#F7DF1E] transition-colors" />
                <FontAwesomeIcon icon={faPython} className="text-2xl hover:text-[#3776AB] transition-colors" />
                <FontAwesomeIcon icon={faAws} className="text-2xl hover:text-[#FF9900] transition-colors" />
                <FontAwesomeIcon icon={faGoogle} className="text-2xl hover:text-white transition-colors" />
                <FontAwesomeIcon icon={faMeta} className="text-2xl hover:text-[#0668E1] transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* MISSION & VALUES */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Empowering the <br />
              <span className="text-blue-500">Digital Generation</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              At Viser360, we believe technology isn't just about gadgets; it's about the code that powers our lives and the innovations that define our humanity.
            </p>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              We strive to provide accurate, unbiased, and deep-dive content that respects your intelligence. Whether you are a senior developer or a curious novice, our platform is built for you.
            </p>
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2">
              <FontAwesomeIcon icon={faNewspaper} />
              Read Our Latest Stories
            </button>
          </motion.div>

          <div className="space-y-6">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4"
              >
                <div className={`mt-1 text-xl ${val.color}`}>
                  <FontAwesomeIcon icon={val.icon} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{val.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOUNDER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 md:p-12 mb-24 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-blue-400 to-cyan-400">
                <img 
                  src={getGravatarUrl('mostafa@visernic.com')} 
                  alt="Mostafa Niloy" 
                  className="w-full h-full rounded-full object-cover border-4 border-slate-900"
                />
              </div>
              <div className="absolute bottom-0 right-2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-slate-900">
                <FontAwesomeIcon icon={faCode} size="xs" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Mostafa Niloy</h2>
              <p className="text-blue-400 font-mono mb-6 text-sm">FOUNDER & CHIEF EDITOR</p>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
                "I started Viser360 with a simple code: to decode the complexities of the tech world for everyone. What began as a personal blog has evolved into a global community of thinkers, builders, and dreamers."
              </p>
              
              <div className="flex justify-center md:justify-start gap-4">
                <a href="mailto:mostafa@visernic.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077b5] transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1DA1F2] transition-colors">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#333] transition-colors">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ SECTION */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} className="text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER LINKS AREA */}
        <div className="text-center border-t border-slate-200 dark:border-slate-800 pt-10">
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-medium text-slate-600 dark:text-gray-400">
            <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('terms'); }} className="hover:text-blue-500 transition-colors">Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('privacy'); }} className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="mailto:mostafa@visernic.com" className="hover:text-blue-500 transition-colors">Contact Support</a>
          </div>
        </div>

      </div>
    </div>
  );
}
