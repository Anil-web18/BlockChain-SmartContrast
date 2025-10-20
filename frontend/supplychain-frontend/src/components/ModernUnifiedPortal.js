import React, { useState, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon, 
  CheckCircleIcon, 
  TruckIcon, 
  ClockIcon,
  ClipboardDocumentListIcon,
  GlobeAltIcon,
  CloudIcon,
  CubeTransparentIcon,
  ShoppingCartIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import ConsumerPortal from './consumer/ConsumerPortal';
import RealTimeTracker from './RealTimeTracker';
import SmartContract from './SmartContract';
import WalletManager from './blockchain/WalletManager';
import ShipmentTracker from './features/ShipmentTracker';
import BlockchainTransaction from './blockchain/BlockchainTransaction';
import BlockchainPortal from './blockchain/BlockchainPortal';
import SimpleBusinessDashboard from './business/SimpleBusinessDashboard';
import ModernCard from './ui/ModernCard';
import ModernButton from './ui/ModernButton';
import NotificationCenter from './ui/NotificationCenter';
import AdvancedMetrics from './ui/AdvancedMetrics';

const ModernUnifiedPortal = ({ user, transactions, trackingResult, onLogout, setDarkMode, darkMode }) => {
  const [activeView, setActiveView] = useState('business');
  const [currentTrackingResult, setTrackingResult] = useState(trackingResult);
  const [showBlockchainPortal, setShowBlockchainPortal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    transactionSpeed: 0,
    systemHealth: 98.5
  });

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    setTimeout(() => {
      const loadTime = performance.now() - startTime;
      setPerformanceMetrics(prev => ({
        ...prev,
        loadTime: loadTime.toFixed(2),
        transactionSpeed: (transactions.length / (loadTime / 1000)).toFixed(1)
      }));
      setIsLoading(false);
    }, 1200);
  }, [transactions]);

  // Memoized calculations for performance
  const dashboardStats = useMemo(() => ({
    total: transactions.length,
    delivered: transactions.filter(t => t.orderStatus === 'Delivered').length,
    shipped: transactions.filter(t => t.orderStatus === 'Shipped').length,
    pending: transactions.filter(t => t.orderStatus === 'Pending').length,
    totalValue: transactions.reduce((sum, t) => sum + (t.orderAmount || 0), 0),
    avgTemp: transactions.length > 0 ? (transactions.reduce((sum, t) => sum + t.temperature, 0) / transactions.length).toFixed(1) : 0,
    avgHumidity: transactions.length > 0 ? (transactions.reduce((sum, t) => sum + t.humidity, 0) / transactions.length).toFixed(1) : 0
  }), [transactions]);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Supply Chain Portal</h2>
          <p className="text-gray-400">Initializing blockchain connections...</p>
        </motion.div>
      </div>
    );
  }

  const BusinessPortal = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Modern Header */}
      <header className="relative z-10">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-b-3xl mx-4 mt-4 p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CubeTransparentIcon className="w-6 h-6 text-white" />
              </div>
              Supply Chain Portal
            </motion.h1>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <ModernButton
                onClick={() => setShowBlockchainPortal(true)}
                variant="primary"
                size="md"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                🔗 Blockchain Portal
              </ModernButton>
              
              <ModernButton
                onClick={() => setActiveView(activeView === 'business' ? 'consumer' : 'business')}
                variant="success"
                size="md"
                icon={activeView === 'business' ? ShoppingCartIcon : BuildingOfficeIcon}
              >
                {activeView === 'business' ? 'Consumer View' : 'Business View'}
              </ModernButton>
              
              <div className="flex items-center gap-4 text-white">
                <span className="text-sm font-medium">Welcome, {user.name}</span>
                <NotificationCenter />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {darkMode ? '☀️' : '🌙'}
                </motion.button>
                <ModernButton
                  onClick={onLogout}
                  variant="danger"
                  size="sm"
                >
                  Logout
                </ModernButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ModernCard variant="glass" className="mb-8 p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="mb-6"
            >
              <GlobeAltIcon className="w-24 h-24 text-blue-400 mx-auto mb-4" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            >
              Blockchain Supply Chain Management
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Track and manage supply chain transactions with real-time data and blockchain verification for complete transparency.
            </motion.p>
          </ModernCard>
        </motion.div>

        {/* Enhanced Stats Grid with Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          {[
            { icon: ChartBarIcon, value: dashboardStats.total, label: 'Total Transactions', color: 'from-blue-500 to-purple-500', trend: '+12%' },
            { icon: CheckCircleIcon, value: dashboardStats.delivered, label: 'Delivered', color: 'from-green-500 to-emerald-500', trend: '+8%' },
            { icon: TruckIcon, value: dashboardStats.shipped, label: 'Shipped', color: 'from-blue-500 to-cyan-500', trend: '+15%' },
            { icon: ClockIcon, value: dashboardStats.pending, label: 'Pending', color: 'from-orange-500 to-red-500', trend: '-5%' },
            { icon: GlobeAltIcon, value: `$${(dashboardStats.totalValue/1000).toFixed(1)}K`, label: 'Total Value', color: 'from-purple-500 to-pink-500', trend: '+22%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <ModernCard 
                variant="glass" 
                className={`p-6 text-center hover-lift bg-gradient-to-br ${stat.color} text-white relative overflow-hidden`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3" />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="text-3xl font-bold mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm opacity-90 mb-2">{stat.label}</div>
                  <div className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-green-200' : 'text-red-200'}`}>
                    {stat.trend} vs last month
                  </div>
                </motion.div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
              </ModernCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <AdvancedMetrics transactions={transactions} />
        </motion.div>

        {/* Order Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-8"
        >
          <SimpleBusinessDashboard />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <ModernCard variant="glass" className="p-6">
            <ShipmentTracker transactions={transactions} onTrackingResult={setTrackingResult} />
          </ModernCard>

          {currentTrackingResult && (
            <ModernCard variant="glass" className="p-6">
              <RealTimeTracker transaction={currentTrackingResult} />
            </ModernCard>
          )}
          
          <ModernCard variant="glass" className="p-6">
            <SmartContract transaction={currentTrackingResult} />
          </ModernCard>
          
          <ModernCard variant="glass" className="p-6">
            <WalletManager user={user} />
          </ModernCard>
          
          <ModernCard variant="glass" className="p-6">
            <BlockchainTransaction user={user} />
          </ModernCard>

          <ModernCard variant="glass" className="p-6">
            <h3 className="flex items-center gap-2 mb-4 text-white font-semibold">
              <CloudIcon className="w-5 h-5" />
              System Performance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Load Time</span>
                <span className="text-lg font-bold text-blue-400">{performanceMetrics.loadTime}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">TX/sec</span>
                <span className="text-lg font-bold text-green-400">{performanceMetrics.transactionSpeed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">System Health</span>
                <span className="text-lg font-bold text-emerald-400">{performanceMetrics.systemHealth}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Environment</span>
                <span className="text-sm text-blue-300">{dashboardStats.avgTemp}°C • {dashboardStats.avgHumidity}%</span>
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* Professional Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="relative z-10 mt-12 p-6"
        >
          <ModernCard variant="glass" className="p-6 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Blockchain Network: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Real-time Tracking: Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>Smart Contracts: Deployed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span>AI Analytics: Processing</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500">
                © 2024 Oil & Gas Supply Chain Management System • Powered by Blockchain Technology
              </p>
            </div>
          </ModernCard>
        </motion.footer>
      </main>
    </div>
  );

  if (showBlockchainPortal) {
    return (
      <>
        <Toaster position="top-right" />
        <BlockchainPortal 
          user={user} 
          onBack={() => setShowBlockchainPortal(false)} 
        />
      </>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px'
          }
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: activeView === 'business' ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeView === 'business' ? 100 : -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {activeView === 'business' ? (
            <BusinessPortal />
          ) : (
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('business')}
                className="fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm"
              >
                🏢 Back to Business
              </motion.button>
              <ConsumerPortal transactions={transactions} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ModernUnifiedPortal;