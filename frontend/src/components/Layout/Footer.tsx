import React from 'react';
import { Recycle, Heart, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Join the sustainable fashion revolution. Exchange, reuse, and reduce textile waste 
              while discovering unique clothing pieces from our community.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with love for the planet</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/browse" className="hover:text-primary-400 transition-colors">Browse Items</a></li>
              <li><a href="/add-item" className="hover:text-primary-400 transition-colors">List an Item</a></li>
              <li><a href="/dashboard" className="hover:text-primary-400 transition-colors">Dashboard</a></li>
              <li><a href="/profile" className="hover:text-primary-400 transition-colors">Profile</a></li>
            </ul>
          </div>

          {/* Sustainability */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-400" />
              <span>Our Impact</span>
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>♻️ Reduce textile waste</li>
              <li>🌱 Promote circular fashion</li>
              <li>🤝 Build community connections</li>
              <li>💚 Support sustainable living</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ReWear. All rights reserved. Building a sustainable future, one swap at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;