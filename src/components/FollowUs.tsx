import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faTiktok, 
  faWhatsapp, 
  faYoutube, 
  faDiscord, 
  faTelegram, 
  faPinterestP, 
  faLinkedinIn, 
  faTwitch, 
  faVk 
} from '@fortawesome/free-brands-svg-icons';

export default function FollowUs() {
  const socialLinks = [
    { name: 'Facebook', icon: faFacebookF, href: '#', color: 'bg-[#3b5998] hover:bg-[#2d4373]' },
    { name: 'Twitter', icon: faTwitter, href: '#', color: 'bg-[#1DA1F2] hover:bg-[#0d8bd9]' },
    { name: 'Instagram', icon: faInstagram, href: '#', color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90' },
    { name: 'TikTok', icon: faTiktok, href: '#', color: 'bg-[#000000] hover:bg-[#1a1a1a]' },
    { name: 'WhatsApp', icon: faWhatsapp, href: '#', color: 'bg-[#25D366] hover:bg-[#1da851]' },
    { name: 'YouTube', icon: faYoutube, href: '#', color: 'bg-[#FF0000] hover:bg-[#cc0000]' },
    { name: 'Discord', icon: faDiscord, href: '#', color: 'bg-[#5865F2] hover:bg-[#4752c4]' },
    { name: 'Telegram', icon: faTelegram, href: '#', color: 'bg-[#0088cc] hover:bg-[#006699]' },
    { name: 'Pinterest', icon: faPinterestP, href: '#', color: 'bg-[#E60023] hover:bg-[#ad081b]' },
    { name: 'LinkedIn', icon: faLinkedinIn, href: '#', color: 'bg-[#0077B5] hover:bg-[#005582]' },
    { name: 'Twitch', icon: faTwitch, href: '#', color: 'bg-[#9146FF] hover:bg-[#772ce8]' },
    { name: 'VK', icon: faVk, href: '#', color: 'bg-[#4C75A3] hover:bg-[#3d5f85]' },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Follow Us</h3>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} text-slate-50 px-4 py-3 rounded-lg font-medium text-sm flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
            aria-label={`Follow us on ${social.name}`}
          >
            <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
            <span>{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
