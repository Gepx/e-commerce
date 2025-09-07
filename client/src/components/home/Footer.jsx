import { Separator } from '../ui/separator';
import {
  SOCIAL_LINKS,
  COMPANY_LINKS,
  RESOURCE_LINKS,
  COMPANY_INFO
} from './constants/homeConstants';
import FooterSection from './components/FooterSection';
import SocialLinks from './components/SocialLinks';
import NewsletterSection from './components/NewsletterSection';

const Footer = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Company Info & Social Links */}
        <div className="flex flex-col items-start col-span-1 gap-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{COMPANY_INFO.name}</h2>
            <p className="text-sm text-gray-500">{COMPANY_INFO.description}</p>
          </div>
          <SocialLinks socialLinks={SOCIAL_LINKS} />
        </div>

        {/* Company Links */}
        <FooterSection title="Company" links={COMPANY_LINKS} />

        {/* Resource Links */}
        <FooterSection title="Resources" links={RESOURCE_LINKS} />

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>

      <Separator className="my-6 h-px w-full bg-gray-300" />

      <div className="text-xs text-center">
        <p>
          &copy; {COMPANY_INFO.year} {COMPANY_INFO.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
