import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  TruckIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PredictiveAnalytics = () => {
  const [activeModel, setActiveModel] = useState('demand');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const demandData = [
    { month: 'Jan', actual: 2400, predicted: 2380, confidence: 94 },
    { month: 'Feb', actual: 1398, predicted: 1420, confidence: 91 },
    { month: 'Mar', actual: 9800, predicted: 9650, confidence: 96 },
    { month: 'Apr', actual: 3908, predicted: 4100, confidence: 88 },
    { month: 'May', actual: 4800, predicted: 4750, confidence: 93 },
    { month: 'Jun', actual: null, predicted: 5200, confidence: 89 }
  ];

  const riskData = [
    { category: 'Weather', risk: 23, trend: 'up' },
    { category: 'Supplier', risk: 67, trend: 'down' },
    { category: 'Transport', risk: 45, trend: 'stable' },
    { category: 'Quality', risk: 12, trend: 'down' },
    { category: 'Demand', risk: 78, trend: 'up' }
  ];

  const routeOptimization = [
    { route: 'Route A', current: 450, optimized: 380, savings: 70, co2Reduction: 15 },
    { route: 'Route B', current: 320, optimized: 290, savings: 30, co2Reduction: 8 },
    { route: 'Route C', current: 680, optimized: 520, savings: 160, co2Reduction: 35 }
  ];

  const pieData = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#EF4444' }
  ];

  useEffect(() => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  }, [activeModel]);

  const ModelCard = ({ id, title, description, icon: Icon, isActive, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
        isActive 
          ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/25' 
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );

  const MetricCard = ({ title, value, unit, trend, icon: Icon }) => (
    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-6 h-6 text-blue-400" />
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {trend === 'up' ? <ArrowTrendingUpIcon className="w-4 h-4" /> : 
             trend === 'down' ? <ArrowTrendingDownIcon className="w-4 h-4" /> : null}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-300 text-sm">{title} {unit}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <CpuChipIcon className="w-8 h-8 text-blue-400" />
          AI Predictive Analytics
        </h2>
        <p className="text-gray-300">Advanced machine learning models for supply chain optimization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ModelCard
          id="demand"
          title="Demand Forecasting"
          description="Predict future demand using historical data and market trends"
          icon={ChartBarIcon}
          isActive={activeModel === 'demand'}
          onClick={() => setActiveModel('demand')}
        />
        <ModelCard
          id="risk"
          title="Risk Assessment"
          description="Identify potential supply chain risks and disruptions"
          icon={ExclamationTriangleIcon}
          isActive={activeModel === 'risk'}
          onClick={() => setActiveModel('risk')}
        />
        <ModelCard
          id="route"
          title="Route Optimization"
          description="AI-powered route planning for cost and time efficiency"
          icon={TruckIcon}
          isActive={activeModel === 'route'}
          onClick={() => setActiveModel('route')}
        />
      </div>

      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white font-medium">AI Model Processing...</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
        </motion.div>
      )}

      <motion.div
        key={activeModel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeModel === 'demand' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard title="Accuracy" value="92.5%" icon={ChartBarIcon} trend="up" />
              <MetricCard title="Next Month" value="5.2K" unit="units" icon={ArrowTrendingUpIcon} trend="up" />
              <MetricCard title="Confidence" value="89%" icon={CpuChipIcon} />
              <MetricCard title="Variance" value="±12%" icon={ClockIcon} />
            </div>

            <div className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4">6-Month Demand Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} name="Actual" />
                  <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={3} strokeDasharray="5 5" name="Predicted" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeModel === 'risk' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Risk Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Risk Categories</h3>
                <div className="space-y-4">
                  {riskData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white font-medium">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-white/20 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.risk > 60 ? 'bg-red-500' : 
                              item.risk > 30 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{width: `${item.risk}%`}}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{item.risk}%</span>
                        {item.trend === 'up' ? 
                          <ArrowTrendingUpIcon className="w-4 h-4 text-red-400" /> :
                          item.trend === 'down' ?
                          <ArrowTrendingDownIcon className="w-4 h-4 text-green-400" /> :
                          <div className="w-4 h-4"></div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <div className="text-red-300 font-medium">High Demand Risk Alert</div>
                    <div className="text-gray-300 text-sm">Consider increasing inventory by 25% for next month</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <ClockIcon className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <div className="text-yellow-300 font-medium">Supplier Reliability</div>
                    <div className="text-gray-300 text-sm">Monitor Supplier B - 15% delay increase detected</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <ChartBarIcon className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-green-300 font-medium">Optimization Opportunity</div>
                    <div className="text-gray-300 text-sm">Route consolidation could save $12K monthly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModel === 'route' && (
          <div className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Route Optimization Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-gray-300 font-medium pb-3">Route</th>
                      <th className="text-gray-300 font-medium pb-3">Current Cost</th>
                      <th className="text-gray-300 font-medium pb-3">Optimized</th>
                      <th className="text-gray-300 font-medium pb-3">Savings</th>
                      <th className="text-gray-300 font-medium pb-3">CO₂ Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeOptimization.map((route, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="text-white py-3 flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-blue-400" />
                          {route.route}
                        </td>
                        <td className="text-gray-300 py-3">${route.current}</td>
                        <td className="text-green-400 py-3">${route.optimized}</td>
                        <td className="text-green-400 py-3 font-medium">
                          ${route.savings} ({Math.round((route.savings/route.current)*100)}%)
                        </td>
                        <td className="text-blue-400 py-3">{route.co2Reduction}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass p-6 text-center">
                <TruckIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">$260</div>
                <div className="text-gray-300 text-sm">Total Monthly Savings</div>
              </div>
              <div className="glass p-6 text-center">
                <ChartBarIcon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">18%</div>
                <div className="text-gray-300 text-sm">Efficiency Improvement</div>
              </div>
              <div className="glass p-6 text-center">
                <CpuChipIcon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">58</div>
                <div className="text-gray-300 text-sm">CO₂ Tons Reduced</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PredictiveAnalytics;