
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Layout from '@/components/Layout';
import { useCart, MenuItem } from '@/context/CartContext';
import { getFilteredMenuItems } from '@/services/api';

const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type');
  
  const [filterType, setFilterType] = useState<string>(initialType || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();

  // Parse filter type to boolean value for API call
  const getIsVegFilter = (): boolean | null => {
    if (filterType === 'veg') return true;
    if (filterType === 'nonveg') return false;
    return null;  // 'all' case
  };

  // Load menu items
  useEffect(() => {
    const loadMenuItems = async () => {
      setIsLoading(true);
      try {
        const items = await getFilteredMenuItems(getIsVegFilter(), searchQuery);
        setMenuItems(items);
      } catch (error) {
        console.error('Error loading menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, [filterType, searchQuery]);

  // Update URL params when filter changes
  useEffect(() => {
    if (filterType !== 'all') {
      searchParams.set('type', filterType);
    } else {
      searchParams.delete('type');
    }
    setSearchParams(searchParams);
  }, [filterType, setSearchParams, searchParams]);

  const handleFilterChange = (value: string) => {
    setFilterType(value);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Our Menu</h1>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex w-full md:w-64">
              <Input
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-10"
              />
              <Button 
                onClick={handleSearch}
                variant="ghost" 
                className="absolute right-0 top-0 h-full px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <RadioGroup 
              value={filterType} 
              onValueChange={handleFilterChange}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="veg" id="veg" />
                <Label htmlFor="veg" className="flex items-center">
                  <span className="h-3 w-3 bg-foodie-green rounded-full mr-1"></span>
                  Veg
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nonveg" id="nonveg" />
                <Label htmlFor="nonveg" className="flex items-center">
                  <span className="h-3 w-3 bg-foodie-red rounded-full mr-1"></span>
                  Non-Veg
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foodie-primary"></div>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-2">No items found</h2>
            <p className="text-gray-600">Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <span className={`h-4 w-4 rounded-full ${item.isVeg ? 'bg-foodie-green' : 'bg-foodie-red'}`}></span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₹{item.price.toFixed(2)}</span>
                    <Button 
                      onClick={() => addToCart(item)} 
                      className="bg-foodie-primary hover:bg-foodie-primary/90"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menu;
