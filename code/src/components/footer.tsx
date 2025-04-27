'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Logo from './logo';
import axiosInstance from '../lib/axiosInstance';

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  subcategories: {
    subcategory_id: string;
    subcategory_name: string;
    slug: string;
  }[];
}

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('get-menu-categories/');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories for footer:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Newsletter and Social */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h3 className="text-[#1a4e78] font-bold mb-1">SIGN UP TO RECEIVE EXCLUSIVE EMAIL OFFERS</h3>
            <p className="text-sm text-gray-600">YOU CAN UNSUBSCRIBE AT ANY TIME</p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
            <Button className="bg-[#1a7ec2] hover:bg-[#1a4e78]">SIGN UP</Button>
          </div>

          <div>
            <h3 className="text-[#1a4e78] font-bold mb-2">CONNECT WITH US</h3>
            <div className="flex gap-2">
              <Link href="#" className="text-[#1a4e78] hover:text-[#1a7ec2]">
                <div className="border border-[#1a4e78] rounded-full p-2">
                  <Facebook className="h-5 w-5" />
                </div>
              </Link>
              <Link href="#" className="text-[#1a4e78] hover:text-[#1a7ec2]">
                <div className="border border-[#1a4e78] rounded-full p-2">
                  <Twitter className="h-5 w-5" />
                </div>
              </Link>
              <Link href="#" className="text-[#1a4e78] hover:text-[#1a7ec2]">
                <div className="border border-[#1a4e78] rounded-full p-2">
                  <Instagram className="h-5 w-5" />
                </div>
              </Link>
              <Link href="#" className="text-[#1a4e78] hover:text-[#1a7ec2]">
                <div className="border border-[#1a4e78] rounded-full p-2">
                  <Youtube className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-700 font-bold mb-4">ACCOUNT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Subscribe Email
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Unsubscribe Email
                </Link>
              </li>
            </ul>

            <h3 className="text-gray-700 font-bold mt-6 mb-4">SHIPPING & RETURNS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Shipping & Handling Rates
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Easy Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-700 font-bold mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Christianbook Rewards
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  GiveBack Program
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Autoship
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Self-Publishing
                </Link>
              </li>
            </ul>

            <h3 className="text-gray-700 font-bold mt-6 mb-4">CATALOG</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Catalog Quick Shop
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Online Catalogs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Request our Catalogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-700 font-bold mb-4">COMMUNITY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Homeschool Compass
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Prayer Wall
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Author Profiles
                </Link>
              </li>
            </ul>

            <h3 className="text-gray-700 font-bold mt-6 mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Company Info.
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Charitable Giving
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Job Opportunities
                </Link>
              </li>
            </ul>

            <h3 className="text-gray-700 font-bold mt-6 mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-700 font-bold mb-4">SHOPS</h3>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.category_id}>
                    <Link
                      href={`/${category.slug}`}
                      className="text-[#1a4e78] hover:underline"
                    >
                      {category.category_name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <span className="text-gray-600">No categories available</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div >
              <Logo />
            </div>

            <div className="text-center md:text-right">
              <div className="flex flex-col items-center md:items-end mb-4">
                <h3 className="text-[#1a4e78] font-bold">1-800-CHRISTIAN</h3>
                <p className="text-gray-600">1-800-247-4784</p>
                <p className="text-gray-600">(Outside the United States and Canada Call: 978-977-5000)</p>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <Link href="#" className="text-[#1a4e78] hover:underline">
                  Email Us
                </Link>
                <p className="text-gray-600">140 Summit St. Peabody, MA 01960</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:underline">
              Tax Information for AL Residents
            </Link>
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Notice
            </Link>
            <Link href="#" className="hover:underline">
              Accessibility Statement
            </Link>
            <Link href="#" className="hover:underline">
              Sitemap
            </Link>
            <span>© 2025 Elifein</span>
            <span>* 65 *</span>
          </div>
        </div>
      </div>
    </footer>
  );
}