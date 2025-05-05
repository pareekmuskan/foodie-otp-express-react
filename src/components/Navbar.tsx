
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md w-full py-4 fixed top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <NavLink to="/" className="text-2xl font-bold text-foodie-primary">
            Foodie
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `font-medium ${isActive ? 'text-foodie-primary' : 'text-gray-600 hover:text-foodie-primary'}`
            }
          >
            Menu
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `font-medium ${isActive ? 'text-foodie-primary' : 'text-gray-600 hover:text-foodie-primary'}`
                }
              >
                <User className="h-5 w-5" />
              </NavLink>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout}
                className="text-gray-600 hover:text-foodie-primary"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-medium ${isActive ? 'text-foodie-primary' : 'text-gray-600 hover:text-foodie-primary'}`
              }
            >
              Login
            </NavLink>
          )}
          
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              `relative ${isActive ? 'text-foodie-primary' : 'text-gray-600 hover:text-foodie-primary'}`
            }
          >
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-foodie-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
