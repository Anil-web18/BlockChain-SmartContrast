import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
  TableCellsIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdvancedAnalytics = () => {
  const [dateRange, setDateRange] = useState('30');

  const analyticsData = {
    monthly: [
      { month: 'Jan', orders: 45, revenue: 12500, efficiency: 87 },
      { month: 'Feb', orders: 52, revenue: 15200, efficiency: 91 },
      { month: 'Mar', orders: 38, revenue: 9800, efficiency: 83 },
      { month: 'Apr', orders: 61, revenue: 18400, efficiency: 94 },
      { month: 'May', orders: 49, revenue: 14100, efficiency: 89 },
      { month: 'Jun', orders: 67, revenue: 21300, efficiency: 96 }
    ],
    categories: [
      { name: 'Oil Products', value: 45, color: '#3B82F6' },
      { name: 'Gas Products', value: 30, color: '#10B981' },
      { name: 'Equipment', value: 15, color: '#F59E0B' },
      { name: 'Services', value: 10, color: '#EF4444' }
    ]
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Month,Orders,Revenue,Efficiency\n"
      + analyticsData.monthly.map(row => `${row.month},${row.orders},${row.revenue},${row.efficiency}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `supply-chain-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <PresentationChartLineIcon className="w-8 h-8 text-blue-400" />
            Advanced Analytics
          </h2>
          <p className="text-gray-300">Comprehensive supply chain insights</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          Export CSV
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <label className="block text-white font-medium mb-2">Date Range</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          >
            <option value="7" className="bg-gray-800">Last 7 days</option>
            <option value="30" className="bg-gray-800">Last 30 days</option>
            <option value="90" className="bg-gray-800">Last 3 months</option>
          </select>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <div className="text-white font-medium mb-2">Total Orders</div>
          <div className="text-2xl font-bold text-blue-400">312</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <div className="text-white font-medium mb-2">Revenue</div>
          <div className="text-2xl font-bold text-green-400">$91.3K</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.monthly}>
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
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.monthly}>
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
              <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.categories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {analyticsData.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-xl font-semibold text-white mb-4">KPI Dashboard</h3>
          <div className="space-y-4">
            {[
              { metric: 'On-Time Delivery', current: 94, target: 95 },
              { metric: 'Cost Efficiency', current: 87, target: 90 },
              { metric: 'Quality Score', current: 96, target: 95 },
              { metric: 'Customer Satisfaction', current: 92, target: 90 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{item.metric}</div>
                  <div className="text-sm text-gray-400">Target: {item.target}%</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.current >= item.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{width: `${item.current}%`}}
                    ></div>
                  </div>
                  <span className="text-white font-bold">{item.current}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;