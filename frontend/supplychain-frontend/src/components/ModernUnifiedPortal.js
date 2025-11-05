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
import RouteOptimization from './logistics/RouteOptimization';
import IoTSensorDashboard from './iot/IoTSensorDashboard';
import CarbonFootprintTracker from './sustainability/CarbonFootprintTracker';
import RiskMonitor from './risk/RiskMonitor';
import VoiceAssistant from './voice/VoiceAssistant';
import ARProductViewer from './ar/ARProductViewer';
import BlockchainExplorer from './blockchain-explorer/BlockchainExplorer';
import PredictiveAnalytics from './ai/PredictiveAnalytics';
import AdvancedAnalytics from './analytics/AdvancedAnalytics';
import PWAInstaller from './pwa/PWAInstaller';
import ModernCard from './ui/ModernCard';
import ModernButton from './ui/ModernButton';
import NotificationCenter from './ui/NotificationCenter';
import AdvancedMetrics from './ui/AdvancedMetrics';

const ModernUnifiedPortal = ({ user, transactions, trackingResult, onLogout, setDarkMode, darkMode }) => {
  const [activeView, setActiveView] = useState('business');
  const [activeTab, setActiveTab] = useState('dashboard');
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


        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: ChartBarIcon },
            { id: 'logistics', label: '🚛 Logistics', icon: TruckIcon },
            { id: 'monitoring', label: '📡 Monitoring', icon: CloudIcon },
            { id: 'innovation', label: '🚀 Innovation', icon: CubeTransparentIcon }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-4">
                <SimpleBusinessDashboard />
                <div className="grid grid-cols-3 gap-4">
                  <ShipmentTracker transactions={transactions} onTrackingResult={setTrackingResult} />
                  <SmartContract transaction={currentTrackingResult} />
                  <WalletManager user={user} />
                </div>
              </div>
            )}
            
            {activeTab === 'logistics' && (
              <div className="space-y-4">
                <RouteOptimization />
                <CarbonFootprintTracker />
              </div>
            )}
            
            {activeTab === 'monitoring' && (
              <div className="space-y-4">
                <IoTSensorDashboard />
                <RiskMonitor />
              </div>
            )}
            
            {activeTab === 'innovation' && (
              <div className="space-y-4">
                <VoiceAssistant />
                <ARProductViewer />
                <BlockchainExplorer />
              </div>
            )}
          </motion.div>
        </AnimatePresence>


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