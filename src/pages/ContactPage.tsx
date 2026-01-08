import { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'mostafa@visernic.com',
      link: 'mailto:mostafa@visernic.com',
      desc: 'Drop us a line anytime',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Global Coverage',
      link: null,
      desc: 'Operating worldwide',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    },
    {
      icon: Phone,
      title: 'Support',
      value: '24/7 Available',
      link: null,
      desc: 'Always here to help',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-2 mb-4 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
            <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Contact <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or story ideas? We'd love to hear from you. Reach out and let's start a conversation.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${info.bg} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">{info.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 text-center">{info.desc}</p>
                <div className="text-center">
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-lg font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-slate-700 dark:text-gray-200">{info.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Send us a Message</h2>
            <p className="text-slate-500 dark:text-gray-400 mb-8">Fill out the form below and we'll get back to you shortly.</p>

            {submitted ? (
              <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-8 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-gray-300">
                  Thank you for reaching out. We have received your message and will respond as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side Info Panel */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Why Contact Us?</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Story Submissions</h4>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                      Have a breaking tech story or unique insight? We're always looking for high-quality content contributors.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Partnership Opportunities</h4>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                      Interested in collaborating or advertising with Viser360? Let's explore how we can grow together.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2.5 h-2.5 bg-cyan-600 dark:bg-cyan-400 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Technical Support</h4>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                      Found a bug or facing issues with the website? Let our engineering team know so we can fix it.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Quick Response Promise</h3>
                <p className="text-blue-50 mb-6 leading-relaxed">
                  We value your time. Our dedicated support team typically responds to all inquiries within 24-48 hours.
                </p>
                <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-flex border border-white/10">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="font-semibold text-sm">Avg. Response: &lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
