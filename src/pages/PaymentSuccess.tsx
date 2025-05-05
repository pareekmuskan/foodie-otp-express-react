
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CheckCircle } from 'lucide-react';

interface LocationState {
  orderId?: string;
}

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = (location.state as LocationState) || {};

  useEffect(() => {
    // If there's no order ID, redirect to home
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. Your order number is <span className="font-semibold">{orderId}</span>.
          </p>
          
          <p className="text-gray-600 mb-8">
            We've sent the order confirmation to your email. You can track your order status in your profile section.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
            <Link to="/menu">
              <Button className="bg-foodie-primary hover:bg-foodie-primary/90">
                Order More Food
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
