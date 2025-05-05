
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-foodie-primary flex items-center justify-center text-white text-2xl font-bold mr-4">
              {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name || 'User'}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Manage Addresses
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                Order History
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50" 
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
