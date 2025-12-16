import { Link } from 'react-router';
import Facebook from "@/assets/icons/facebook.png"
import Twitter from "@/assets/icons/twitter.png"  
import Insta from "@/assets/icons/instagram.png"
import Youtube from "@/assets/icons/youtube.png"
import { 
  Heart,
  Truck,
  Sprout,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import type { FC, ReactNode } from 'react';

interface SocialLink {
  name: string;
  icon: ReactNode;
  url: string;
}

interface FooterLink {
  label: string;
  to: string;
}

const Footer: FC = () => {
  const socialLinks: SocialLink[] = [
    { 
      name: 'Facebook', 
      icon: <img src={Facebook} alt="Facebook" className="w-5 h-5" />, 
      url: 'https://facebook.com' 
    },
    { 
      name: 'Instagram', 
      icon: <img src={Insta} alt="Instagram" className="w-5 h-5" />, 
      url: 'https://instagram.com' 
    },
    { 
      name: 'Twitter', 
      icon: <img src={Twitter} alt="Twitter" className="w-5 h-5" />, 
      url: 'https://twitter.com' 
    },
    { 
      name: 'YouTube', 
      icon: <img src={Youtube} alt="YouTube" className="w-5 h-5" />, 
      url: 'https://youtube.com' 
    },
  ];

  const quickLinks: FooterLink[] = [
    { label: 'Shop Vegetables', to: '/vegetables' },
    { label: 'Organic Spices', to: '/spices' },
    { label: 'Recipes', to: '/recipes' },
    { label: 'Seasonal Specials', to: '/seasonal' },
  ];

  const companyLinks: FooterLink[] = [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Delivery Info', to: '/delivery' },
    { label: 'Privacy Policy', to: '/privacy' },
  ];

  const customerLinks: FooterLink[] = [
    { label: 'My Account', to: '/account' },
    { label: 'Order Tracking', to: '/tracking' },
    { label: 'FAQs', to: '/faq' },
    { label: 'Returns', to: '/returns' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="bg-green-800 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
              <Truck className="text-white" size={28} />
              <div>
                <h3 className="font-bold">Free Delivery</h3>
                <p className="text-sm text-green-100">On orders over $50</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
              <Sprout className="text-white" size={28} />
              <div>
                <h3 className="font-bold">100% Organic</h3>
                <p className="text-sm text-green-100">Certified produce</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
              <Heart className="text-white" size={28} />
              <div>
                <h3 className="font-bold">Fresh Guarantee</h3>
                <p className="text-sm text-green-100">Or your money back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-green-400 mb-2">FreshHarvest</h2>
              <p className="text-gray-300">
                Delivering farm-fresh vegetables and premium spices directly to your doorstep.
              </p>
            </div>
            
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-green-700 p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-3">Subscribe to our newsletter</h3>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Shop</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-green-400 mt-1" size={18} />
                <p className="text-gray-300">
                  123 Farm Street<br />
                  Green Valley, CA 90210
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-green-400" size={18} />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-green-400">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-green-400" size={18} />
                <a href="mailto:info@freshharvest.com" className="text-gray-300 hover:text-green-400">
                  info@freshharvest.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Customer Care</h3>
              <ul className="space-y-2">
                {customerLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.to}
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FreshHarvest. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="text-red-400" size={16} />
              <span>for fresh food lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;