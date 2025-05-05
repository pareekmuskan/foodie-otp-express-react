
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight mb-6">
            Delicious Food <span className="text-foodie-primary">Delivered</span> To Your Door
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl">
            Explore our wide range of vegetarian and non-vegetarian dishes, made with fresh ingredients and delivered straight to your doorstep.
          </p>
          <Link to="/menu">
            <Button className="bg-foodie-primary hover:bg-foodie-primary/90 px-8 py-6 text-lg">
              Explore Menu
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="bg-foodie-light rounded-lg p-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <span className="text-foodie-green text-2xl">🥗</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Vegetarian</h2>
            <p className="text-gray-600 mb-6">
              Discover our delicious range of vegetarian dishes, from hearty main courses to delectable desserts.
            </p>
            <Link to="/menu?type=veg">
              <Button variant="outline" className="border-foodie-green text-foodie-green hover:bg-foodie-green hover:text-white">
                View Veg Menu
              </Button>
            </Link>
          </div>

          <div className="bg-foodie-light rounded-lg p-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <span className="text-foodie-red text-2xl">🍗</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Non-Vegetarian</h2>
            <p className="text-gray-600 mb-6">
              Indulge in our premium selection of non-vegetarian dishes, prepared with the finest quality ingredients.
            </p>
            <Link to="/menu?type=nonveg">
              <Button variant="outline" className="border-foodie-red text-foodie-red hover:bg-foodie-red hover:text-white">
                View Non-Veg Menu
              </Button>
            </Link>
          </div>
        </div>

        <div className="py-12 md:py-20 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="h-16 w-16 bg-foodie-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-foodie-primary text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Menu</h3>
              <p className="text-gray-600">Explore our wide range of delicious meals and select your favorites.</p>
            </div>

            <div className="p-6">
              <div className="h-16 w-16 bg-foodie-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-foodie-primary text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Place Order</h3>
              <p className="text-gray-600">Add items to your cart and securely check out with our easy payment system.</p>
            </div>

            <div className="p-6">
              <div className="h-16 w-16 bg-foodie-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-foodie-primary text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Delivery</h3>
              <p className="text-gray-600">Sit back and relax as we deliver your order straight to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
