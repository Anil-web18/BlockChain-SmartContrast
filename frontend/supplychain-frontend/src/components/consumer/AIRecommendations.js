import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, HeartIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const AIRecommendations = ({ onAddToCart, cartItems = [] }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('trending');

  const mockProducts = [
    { id: 1, name: 'Premium Crude Oil', price: 89.99, rating: 4.8, category: 'oil', image: '🛢️', sustainability: 92 },
    { id: 2, name: 'Natural Gas Premium', price: 45.50, rating: 4.9, category: 'gas', image: '⛽', sustainability: 88 },
    { id: 3, name: 'Refined Gasoline', price: 67.25, rating: 4.7, category: 'refined', image: '🚗', sustainability: 85 },
    { id: 4, name: 'Industrial Lubricant', price: 125.00, rating: 4.6, category: 'equipment', image: '🔧', sustainability: 90 },
    { id: 5, name: 'Eco-Friendly Diesel', price: 78.99, rating: 4.9, category: 'refined', image: '🚛', sustainability: 95 },
    { id: 6, name: 'Pipeline Equipment', price: 299.99, rating: 4.5, category: 'equipment', image: '🏗️', sustainability: 87 }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const aiRecommendations = generateAIRecommendations();
      setRecommendations(aiRecommendations);
      setIsLoading(false);
    }, 1500);
  }, [selectedCategory, cartItems]);

  const generateAIRecommendations = () => {
    let filtered = [...mockProducts];
    
    if (selectedCategory === 'trending') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedCategory === 'sustainable') {
      filtered = filtered.sort((a, b) => b.sustainability - a.sustainability);
    } else if (selectedCategory === 'personalized') {
      // Simulate personalized recommendations based on cart
      const cartCategories = cartItems.map(item => item.category || 'oil');
      filtered = filtered.filter(product => 
        cartCategories.includes(product.category) || Math.random() > 0.5
      );
    }
    
    return filtered.slice(0, 4);
  };

  const categories = [
    { id: 'trending', label: 'Trending', icon: ArrowTrendingUpIcon, color: 'blue' },
    { id: 'sustainable', label: 'Eco-Friendly', icon: SparklesIcon, color: 'green' },
    { id: 'personalized', label: 'For You', icon: HeartIcon, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <SparklesIcon className="w-8 h-8 text-yellow-400" />
          AI Recommendations
        </h2>
        <p className="text-gray-300">Personalized product suggestions powered by machine learning</p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 flex-wrap">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? `bg-${category.color}-500 text-white shadow-lg`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              {category.label}
            </motion.button>
          );
        })}
      </div>

      {/* AI Processing Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-white">AI analyzing your preferences...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations Grid */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {recommendations.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-6xl mb-4"
                  >
                    {product.image}
                  </motion.div>
                  
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-300 text-sm">{product.rating}</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      ${product.price}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-xs text-gray-400">Sustainability:</span>
                      <div className="w-16 bg-white/20 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${product.sustainability}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                          className="bg-green-500 h-2 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-green-400">{product.sustainability}%</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Add to Cart
                  </motion.button>
                </div>

                {/* AI Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold"
                >
                  AI Pick
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-yellow-400" />
          AI Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">94%</div>
            <div className="text-gray-300 text-sm">Match Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">$127</div>
            <div className="text-gray-300 text-sm">Avg Savings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">2.3x</div>
            <div className="text-gray-300 text-sm">Purchase Likelihood</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIRecommendations;