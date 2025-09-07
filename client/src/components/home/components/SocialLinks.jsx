import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const iconMap = {
  FaInstagram: FaInstagram,
  FaFacebook: FaFacebook,
  FaXTwitter: FaXTwitter,
  FaLinkedin: FaLinkedin
};

const SocialLinks = ({ socialLinks }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {socialLinks.map((link) => {
        const IconComponent = iconMap[link.icon];
        return (
          <Link
            to={link.href}
            key={link.label}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label={link.label}>
            {IconComponent && <IconComponent size={20} />}
          </Link>
        );
      })}
    </div>
  );
};

export default SocialLinks;
