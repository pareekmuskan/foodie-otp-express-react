
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Foodie</h3>
            <p className="text-gray-300">
              Delicious food delivered to your doorstep.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/menu" className="text-gray-300 hover:text-white">Menu</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-white">Login</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: support@foodie.com<br />
              Phone: +91 9876543210
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Foodie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
