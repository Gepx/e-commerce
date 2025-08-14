import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { Form, FormControl, FormField } from '../ui/form';
import { useForm } from 'react-hook-form';

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaXTwitter />, href: '#', label: 'X' },
    { icon: <FaLinkedin />, href: '#', label: 'Linkedin' }
  ];

  const companyLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Delivery', href: '#' },
    { label: 'Teams', href: '#' }
  ];

  const resourceLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Sales', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ];

  const form = useForm({
    defaultValues: { email: '' }
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4 items-start">
        <div className="flex flex-col items-start cols-span-1 gap-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">SHOP</h2>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ducimus pariatur
              sapiente sed obcaecati. Quos temporibus officiis recusandae sed ea!
            </p>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-4 gap-4">
            {socialLinks.map((link) => (
              <Link to={link.href} key={link.label}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        {/* Company */}
        <div className="flex flex-col items-start col-span-1 gap-4">
          <h2 className="text-2xl font-bold">Company</h2>
          <ul className="text-sm text-gray-500 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.label} className="hover:text-gray-700">
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Resource */}
        <div className="flex flex-col items-start cols-span-1 gap-4">
          <h2 className="text-2xl font-bold">Resources</h2>
          <ul className="text-sm text-gray-500 space-y-2">
            {resourceLinks.map((link) => (
              <li key={link.label} className="hover:text-gray-700">
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Email Subscription */}
        <div className="flex flex-col items-start cols-span-1 gap-1">
          <h2 className="text-sm font-semibold">Subscribe to our newsletter</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="flex flex-row gap-2">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-l-0"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="bg-black text-white hover:bg-gray-700 cursor-pointer">
                      Subscribe
                    </Button>
                  </div>
                )}
              />
            </form>
          </Form>
          <p className="text-xs font-light">
            By submitting, you agree to our{' '}
            <span className="text-xs font-normal hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>

      <Separator className="my-6 h-px w-full bg-gray-300" />

      <div className="text-xs text-center">
        <p>&copy; 2025 SHOP. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
