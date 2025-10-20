import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const AdvancedMetrics = ({ transactions }) => {
  const [metrics, setMetrics] = useState({
    efficiency: 0,
    costSavings: 0,
    carbonReduction: 0,
    securityScore: 0,
    avgDeliveryTime: 0,
    customerSatisfaction: 0
  });

  useEffect(() => {
    // Simulate advanced calculations
    const timer = setTimeout(() => {
      setMetrics({
        efficiency: 94.7,
        costSavings: 23.5,
        carbonReduction: 18.2,
        securityScore: 99.1,
        avgDeliveryTime: 4.2,
        customerSatisfaction: 96.8
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [transactions]);

  const MetricCard = ({ icon: Icon, title, value, unit, trend, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-premium p-6 hover-scale"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowTrendingDownIcon className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <div className="flex items-baseline gap-1">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="text-2xl font-bold text-white"
          >
            {value}
          </motion.span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 w-full bg-white/10 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ delay: delay + 0.5, duration: 1 }}
          className={`h-2 rounded-full ${color.replace('bg-', 'bg-gradient-to-r from-').replace('-500', '-400 to-').replace('to-', '')}-600`}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gradient-primary mb-2">
          Advanced Analytics Dashboard
        </h2>
        <p className="text-gray-400">
          Real-time insights powered by AI and blockchain technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={ChartBarIcon}
          title="Supply Chain Efficiency"
          value={metrics.efficiency}
          unit="%"
          trend={5.2}
          color="bg-blue-500"
          delay={0.1}
        />
        
        <MetricCard
          icon={CurrencyDollarIcon}
          title="Cost Savings"
          value={metrics.costSavings}
          unit="%"
          trend={3.8}
          color="bg-green-500"
          delay={0.2}
        />
        
        <MetricCard
          icon={GlobeAltIcon}
          title="Carbon Footprint Reduction"
          value={metrics.carbonReduction}
          unit="%"
          trend={2.1}
          color="bg-emerald-500"
          delay={0.3}
        />
        
        <MetricCard
          icon={ShieldCheckIcon}
          title="Security Score"
          value={metrics.securityScore}
          unit="%"
          trend={1.5}
          color="bg-purple-500"
          delay={0.4}
        />
        
        <MetricCard
          icon={ClockIcon}
          title="Avg Delivery Time"
          value={metrics.avgDeliveryTime}
          unit="days"
          trend={-8.3}
          color="bg-orange-500"
          delay={0.5}
        />
        
        <MetricCard
          icon={ArrowTrendingUpIcon}
          title="Customer Satisfaction"
          value={metrics.customerSatisfaction}
          unit="%"
          trend={4.7}
          color="bg-pink-500"
          delay={0.6}
        />
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-premium p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          🤖 AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white font-medium">Optimal Route Detected</p>
                <p className="text-xs text-gray-400">AI suggests 15% faster delivery route for next shipment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white font-medium">Demand Forecast</p>
                <p className="text-xs text-gray-400">23% increase in demand predicted for next quarter</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white font-medium">Risk Assessment</p>
                <p className="text-xs text-gray-400">Low risk detected across all active shipments</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white font-medium">Blockchain Health</p>
                <p className="text-xs text-gray-400">All smart contracts executing flawlessly</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedMetrics;