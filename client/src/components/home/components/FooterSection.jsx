import { Link } from 'react-router-dom';

const FooterSection = ({ title, links }) => {
  return (
    <div className="flex flex-col items-start col-span-1 gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="text-sm text-gray-500 space-y-2">
        {links.map((link) => (
          <li key={link.label} className="hover:text-gray-700 transition-colors">
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
