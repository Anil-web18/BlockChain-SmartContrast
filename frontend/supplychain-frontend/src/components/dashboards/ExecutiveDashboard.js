import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const ExecutiveDashboard = () => {
  const [kpis, setKpis] = useState({
    totalRevenue: 12500000,
    profitMargin: 18.5,
    customerSatisfaction: 94.2,
    marketShare: 23.8,
    operationalEfficiency: 87.3,
    riskScore: 12
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Delayed shipment from Supplier A', time: '2 min ago' },
    { id: 2, type: 'success', message: 'Q3 targets exceeded by 15%', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'New partnership agreement signed', time: '3 hours ago' }
  ]);

  const ExecutiveCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${color} shadow-2xl border border-white/10`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
          {trend && (
            <div className="flex items-center space-x-1 text-white/80">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl font-bold text-white">{value}</div>
          <div className="text-white/90 font-medium">{title}</div>
          {subtitle && <div className="text-white/70 text-sm">{subtitle}</div>}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-white/5"></div>
    </motion.div>
  );

  const AlertCard = ({ alert }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center space-x-4 p-4 rounded-xl border-l-4 ${
        alert.type === 'warning' ? 'bg-orange-500/10 border-orange-500' :
        alert.type === 'success' ? 'bg-green-500/10 border-green-500' :
        'bg-blue-500/10 border-blue-500'
      } backdrop-blur-sm`}
    >
      <div className={`p-2 rounded-lg ${
        alert.type === 'warning' ? 'bg-orange-500/20' :
        alert.type === 'success' ? 'bg-green-500/20' :
        'bg-blue-500/20'
      }`}>
        {alert.type === 'warning' ? (
          <ExclamationTriangleIcon className="w-5 h-5 text-orange-400" />
        ) : alert.type === 'success' ? (
          <CheckCircleIcon className="w-5 h-5 text-green-400" />
        ) : (
          <ClockIcon className="w-5 h-5 text-blue-400" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-white font-medium">{alert.message}</div>
        <div className="text-white/60 text-sm">{alert.time}</div>
      </div>
    </motion.div>
  );

  const WorldMap = () => (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cdefs%3E%3Cpattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)"/%3E%3C/svg%3E')`
      }}></div>
      
      {/* Animated dots representing global operations */}
      {[
        { x: '20%', y: '30%', size: 'w-3 h-3', color: 'bg-blue-400' },
        { x: '45%', y: '25%', size: 'w-4 h-4', color: 'bg-green-400' },
        { x: '70%', y: '40%', size: 'w-2 h-2', color: 'bg-purple-400' },
        { x: '30%', y: '60%', size: 'w-3 h-3', color: 'bg-orange-400' },
        { x: '80%', y: '35%', size: 'w-2 h-2', color: 'bg-pink-400' }
      ].map((dot, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          className={`absolute ${dot.size} ${dot.color} rounded-full shadow-lg`}
          style={{ left: dot.x, top: dot.y }}
        >
          <div className={`absolute inset-0 ${dot.color} rounded-full animate-ping opacity-75`}></div>
        </motion.div>
      ))}
      
      <div className="absolute bottom-4 left-4 text-white/80">
        <div className="text-sm font-medium">Global Operations</div>
        <div className="text-xs text-white/60">5 Active Regions</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-3">🏢 Executive Dashboard</h1>
          <p className="text-white/70 text-lg">Strategic insights and key performance indicators</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <ExecutiveCard
            title="Total Revenue"
            value="$12.5M"
            subtitle="Quarterly Performance"
            icon={CurrencyDollarIcon}
            color="from-emerald-600 to-emerald-800"
            trend="+24.5%"
          />
          <ExecutiveCard
            title="Profit Margin"
            value="18.5%"
            subtitle="Above Industry Average"
            icon={ArrowTrendingUpIcon}
            color="from-blue-600 to-blue-800"
            trend="+3.2%"
          />
          <ExecutiveCard
            title="Customer Satisfaction"
            value="94.2%"
            subtitle="Net Promoter Score"
            icon={UserGroupIcon}
            color="from-purple-600 to-purple-800"
            trend="+1.8%"
          />
          <ExecutiveCard
            title="Market Share"
            value="23.8%"
            subtitle="Industry Leadership"
            icon={BuildingOfficeIcon}
            color="from-orange-600 to-orange-800"
            trend="+5.1%"
          />
          <ExecutiveCard
            title="Operational Efficiency"
            value="87.3%"
            subtitle="Process Optimization"
            icon={MapPinIcon}
            color="from-teal-600 to-teal-800"
            trend="+12.3%"
          />
          <ExecutiveCard
            title="Risk Score"
            value="12"
            subtitle="Low Risk Profile"
            icon={ExclamationTriangleIcon}
            color="from-red-600 to-red-800"
            trend="-8.5%"
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Global Operations Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">🌍 Global Operations</h3>
            <WorldMap />
          </motion.div>

          {/* Real-time Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">🚨 Real-time Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AlertCard alert={alert} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;