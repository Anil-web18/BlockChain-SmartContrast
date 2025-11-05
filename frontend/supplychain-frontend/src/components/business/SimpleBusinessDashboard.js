import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  BanknotesIcon,
  TruckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SimpleBusinessDashboard = () => {
  const [dateRange, setDateRange] = useState('30');

  const businessData = {
    monthly: [
      { month: 'Jan', revenue: 45000, orders: 120, profit: 12000 },
      { month: 'Feb', revenue: 52000, orders: 145, profit: 15600 },
      { month: 'Mar', revenue: 38000, orders: 98, profit: 9500 },
      { month: 'Apr', revenue: 61000, orders: 167, profit: 18300 },
      { month: 'May', revenue: 49000, orders: 134, profit: 14700 },
      { month: 'Jun', revenue: 67000, orders: 189, profit: 20100 }
    ],
    categories: [
      { name: 'Crude Oil', value: 45, color: '#3B82F6' },
      { name: 'Natural Gas', value: 30, color: '#10B981' },
      { name: 'Refined Products', value: 20, color: '#F59E0B' },
      { name: 'Equipment', value: 5, color: '#EF4444' }
    ],
    kpis: [
      { metric: 'Revenue Growth', current: 23, target: 20, unit: '%' },
      { metric: 'Order Fulfillment', current: 96, target: 95, unit: '%' },
      { metric: 'Customer Retention', current: 89, target: 85, unit: '%' },
      { metric: 'Profit Margin', current: 28, target: 25, unit: '%' }
    ]
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Month,Revenue,Orders,Profit\n"
      + businessData.monthly.map(row => `${row.month},${row.revenue},${row.orders},${row.profit}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `business-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <PresentationChartLineIcon className="w-8 h-8 text-blue-400" />
            Business Analytics Dashboard
          </h2>
          <p className="text-gray-300">Comprehensive business performance insights</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          Export Report
        </motion.button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Revenue', value: '$312K', change: '+23%', icon: BanknotesIcon, color: 'blue' },
          { title: 'Total Orders', value: '1,053', change: '+18%', icon: ChartBarIcon, color: 'green' },
          { title: 'Active Customers', value: '847', change: '+12%', icon: UserGroupIcon, color: 'purple' },
          { title: 'Shipments', value: '1,205', change: '+15%', icon: TruckIcon, color: 'yellow' }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/10 rounded-lg p-4 border-l-4 border-${card.color}-500`}
          >
            <div className="flex items-center justify-between mb-2">
              <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              <span className={`text-xs font-semibold ${card.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-gray-300 text-sm">{card.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Orders */}
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Revenue & Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={businessData.monthly}>
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
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              <Bar dataKey="orders" fill="#10B981" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Trend */}
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Profit Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={businessData.monthly}>
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
              <Line type="monotone" dataKey="profit" stroke="#F59E0B" strokeWidth={3} name="Profit ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Categories */}
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={businessData.categories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {businessData.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* KPI Performance */}
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            {businessData.kpis.map((kpi, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{kpi.metric}</div>
                  <div className="text-sm text-gray-400">Target: {kpi.target}{kpi.unit}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${kpi.current >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{width: `${Math.min((kpi.current/Math.max(kpi.target, 100))*100, 100)}%`}}
                    ></div>
                  </div>
                  <span className="text-white font-bold w-12">{kpi.current}{kpi.unit}</span>
                  <span className={`text-sm ${kpi.current >= kpi.target ? 'text-green-400' : 'text-yellow-400'}`}>
                    {kpi.current >= kpi.target ? '✓' : '⚠'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBusinessDashboard;