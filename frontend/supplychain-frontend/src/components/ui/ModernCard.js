import React from 'react';
import { motion } from 'framer-motion';

const ModernCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  padding = 'lg',
  ...props 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-lg border border-gray-200',
    glass: 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg border border-blue-200',
    dark: 'bg-gray-900 shadow-xl border border-gray-700 text-white'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';
  
  const cardClasses = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cardClasses}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ModernCard;