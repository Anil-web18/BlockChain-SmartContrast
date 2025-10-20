import React from 'react';
import { motion } from 'framer-motion';

const ModernButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  icon: Icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 hover:from-blue-700 hover:to-purple-700',
    secondary: 'bg-white text-gray-700 border-2 border-gray-300 shadow-md hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl focus:ring-green-500 hover:from-green-600 hover:to-emerald-600',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl focus:ring-red-500 hover:from-red-600 hover:to-pink-600',
    outline: 'border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </div>
      )}
    </motion.button>
  );
};

export default ModernButton;