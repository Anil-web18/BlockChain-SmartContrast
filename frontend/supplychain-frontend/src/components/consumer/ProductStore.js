import React, { useState } from 'react';
import { 
  ShoppingCartIcon, 
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { oilGasProducts } from '../../data/oilGasProducts';
import toast from 'react-hot-toast';

const ProductStore = ({ onAddToCart, cartItems = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', 'Fuel', 'Gas', 'Heating', 'Aviation'];

  const filteredProducts = oilGasProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price': return a.price - b.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? 
        <StarSolid key={i} className="w-4 h-4 text-yellow-400" /> :
        <StarIcon key={i} className="w-4 h-4 text-gray-300" />
    ));
  };

  const handleAddToCart = (product) => {
    console.log('Button clicked for product:', product.name);
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }
    console.log('Calling onAddToCart with:', product);
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  console.log('ProductStore rendering, products:', oilGasProducts.length);
  console.log('onAddToCart function:', typeof onAddToCart);
  console.log('cartItems:', cartItems);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Oil & Gas Products</h2>
        <div className="text-sm text-gray-500">
          {filteredProducts.length} products available
        </div>
        <button 
          onClick={() => {
            // Test direct order placement
            const testOrder = {
              orderId: `TEST-${Date.now()}`,
              items: [{ id: 1, name: 'Test Product', price: 100, quantity: 1 }],
              customer: { firstName: 'Test', lastName: 'User', email: 'test@test.com', city: 'Test City', zipCode: '12345' },
              total: 100,
              orderDate: new Date().toISOString()
            };
            onAddToCart && onAddToCart({ id: 999, name: 'Test Product', price: 100 });
            alert('Test order created - check console and business portal!');
          }} 
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          TEST ORDER
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">by {product.supplier}</div>
                  <div className="text-xs text-green-600">{product.origin}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    product.inStock 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  Add to Cart
                </button>
                
                {getCartQuantity(product.id) > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{getCartQuantity(product.id)} in cart</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {product.certifications.map((cert, index) => (
                  <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FunnelIcon className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductStore;