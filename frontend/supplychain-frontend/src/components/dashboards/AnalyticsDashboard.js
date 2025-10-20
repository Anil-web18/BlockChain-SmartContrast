import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  TruckIcon, 
  CubeIcon, 
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalShipments: 15847,
    activeRoutes: 234,
    deliveryRate: 98.7,
    avgDeliveryTime: 3.2,
    carbonFootprint: 2.1,
    costSavings: 847000
  });

  const [chartData, setChartData] = useState([
    { month: 'Jan', shipments: 1200, revenue: 240000, efficiency: 94 },
    { month: 'Feb', shipments: 1350, revenue: 270000, efficiency: 96 },
    { month: 'Mar', shipments: 1180, revenue: 236000, efficiency: 92 },
    { month: 'Apr', shipments: 1420, revenue: 284000, efficiency: 97 },
    { month: 'May', shipments: 1380, revenue: 276000, efficiency: 95 },
    { month: 'Jun', shipments: 1520, revenue: 304000, efficiency: 98 }
  ]);

  const MetricCard = ({ title, value, change, icon: Icon, trend, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${color} backdrop-blur-xl border border-white/20 shadow-2xl`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {trend === 'up' ? (
              <ArrowTrendingUpIcon className="w-3 h-3" />
            ) : (
              <ArrowTrendingDownIcon className="w-3 h-3" />
            )}
            <span>{change}</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-white/80 text-sm font-medium">{title}</div>
      </div>
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
    </motion.div>
  );

  const ChartCard = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      {children}
    </motion.div>
  );

  const BarChart = ({ data }) => (
    <div className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={item.month}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="flex items-center space-x-4"
        >
          <div className="w-8 text-white/80 text-sm font-medium">{item.month}</div>
          <div className="flex-1 relative">
            <div className="h-8 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.shipments / 1600) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </div>
          <div className="w-16 text-white text-sm font-bold text-right">{item.shipments}</div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">📊 Analytics Dashboard</h1>
          <p className="text-white/70">Real-time supply chain performance insights</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Shipments"
            value="15,847"
            change="+12.5%"
            icon={TruckIcon}
            trend="up"
            color="from-blue-600 to-blue-800"
          />
          <MetricCard
            title="Active Routes"
            value="234"
            change="+8.2%"
            icon={GlobeAltIcon}
            trend="up"
            color="from-purple-600 to-purple-800"
          />
          <MetricCard
            title="Delivery Rate"
            value="98.7%"
            change="+2.1%"
            icon={ShieldCheckIcon}
            trend="up"
            color="from-green-600 to-green-800"
          />
          <MetricCard
            title="Avg Delivery Time"
            value="3.2 days"
            change="-0.8%"
            icon={ClockIcon}
            trend="down"
            color="from-orange-600 to-orange-800"
          />
          <MetricCard
            title="Carbon Footprint"
            value="2.1 tons"
            change="-15.3%"
            icon={CubeIcon}
            trend="down"
            color="from-teal-600 to-teal-800"
          />
          <MetricCard
            title="Cost Savings"
            value="$847K"
            change="+23.7%"
            icon={ChartBarIcon}
            trend="up"
            color="from-indigo-600 to-indigo-800"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Shipments">
            <BarChart data={chartData} />
          </ChartCard>
          
          <ChartCard title="Live Performance Monitor">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">System Health</span>
                <span className="text-green-400 font-bold">99.8%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '99.8%' }}
                  transition={{ duration: 2 }}
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                />
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;