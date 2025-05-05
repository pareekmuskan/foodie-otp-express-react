
import { MenuItem } from "../context/CartContext";

// Sample menu items data (in a real app, this would come from the backend)
const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Paneer Tikka",
    description: "Chunks of cottage cheese marinated in spices and grilled to perfection",
    price: 249,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Appetizers",
    isVeg: true
  },
  {
    id: "2",
    name: "Butter Chicken",
    description: "Tender chicken in a rich and creamy tomato-based sauce",
    price: 349,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Main Course",
    isVeg: false
  },
  {
    id: "3",
    name: "Veg Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
    price: 299,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Rice",
    isVeg: true
  },
  {
    id: "4",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
    price: 349,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Rice",
    isVeg: false
  },
  {
    id: "5",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling, served with chutney and sambar",
    price: 199,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "South Indian",
    isVeg: true
  },
  {
    id: "6",
    name: "Fish Curry",
    description: "Fresh fish cooked in a tangy and spicy gravy",
    price: 399,
    image: "https://images.unsplash.com/photo-1626102828744-a340bde63fe1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Main Course",
    isVeg: false
  },
  {
    id: "7",
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy",
    price: 279,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Main Course",
    isVeg: true
  },
  {
    id: "8",
    name: "Tandoori Chicken",
    description: "Chicken marinated in yogurt and spices, cooked in a clay oven",
    price: 329,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Appetizers",
    isVeg: false
  }
];

// API functions for menu operations
export const getMenuItems = async (): Promise<MenuItem[]> => {
  // In a real app, this would fetch from your backend
  return new Promise(resolve => {
    setTimeout(() => resolve(MENU_ITEMS), 500);
  });
};

export const getFilteredMenuItems = async (isVeg: boolean | null, searchTerm: string = ''): Promise<MenuItem[]> => {
  // In a real app, this would be a backend API call with filters
  return new Promise(resolve => {
    const filtered = MENU_ITEMS.filter(item => {
      // Apply vegetarian/non-vegetarian filter if specified
      if (isVeg !== null && item.isVeg !== isVeg) {
        return false;
      }
      
      // Apply search filter if provided
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setTimeout(() => resolve(filtered), 500);
  });
};

// API functions for payment operations
export const processPayment = async (
  amount: number, 
  cardNumber: string, 
  expiryDate: string, 
  cvv: string
): Promise<{ success: boolean, orderId?: string, message?: string }> => {
  // In a real app, this would call your payment processing backend
  return new Promise(resolve => {
    // Simple validation
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      resolve({ success: false, message: 'Invalid card number' });
      return;
    }
    
    if (cvv.length !== 3) {
      resolve({ success: false, message: 'Invalid CVV' });
      return;
    }
    
    setTimeout(() => {
      // Mock success response
      resolve({ 
        success: true, 
        orderId: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Payment successful'
      });
    }, 1500);
  });
};
