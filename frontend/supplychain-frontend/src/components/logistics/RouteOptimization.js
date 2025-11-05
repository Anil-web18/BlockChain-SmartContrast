import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TruckIcon, MapPinIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const RouteOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const routeData = [
    { route: 'Route A', current: 450, optimized: 380, savings: 70, co2Reduction: 15, distance: '245 km' },
    { route: 'Route B', current: 320, optimized: 290, savings: 30, co2Reduction: 8, distance: '180 km' },
    { route: 'Route C', current: 680, optimized: 520, savings: 160, co2Reduction: 35, distance: '420 km' }
  ];

  const totalSavings = routeData.reduce((sum, route) => sum + route.savings, 0);
  const totalCO2Reduction = routeData.reduce((sum, route) => sum + route.co2Reduction, 0);

  const optimizeRoutes = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 2000);
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Route,Current Cost,Optimized Cost,Savings,CO2 Reduction,Distance\n"
      + routeData.map(r => `${r.route},$${r.current},$${r.optimized},$${r.savings},${r.co2Reduction}%,${r.distance}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `route-optimization-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TruckIcon className="w-8 h-8 text-blue-400" />
            Route Optimization
          </h2>
          <p className="text-gray-300">AI-powered route planning for cost and efficiency</p>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={optimizeRoutes}
            disabled={isOptimizing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg"
          >
            {isOptimizing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <TruckIcon className="w-5 h-5" />
            )}
            {isOptimizing ? 'Optimizing...' : 'Optimize Routes'}
          </motion.button>
          
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
          <TruckIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">${totalSavings}</div>
          <div className="text-gray-300 text-sm">Total Monthly Savings</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
          <div className="w-8 h-8 text-green-400 mx-auto mb-3 text-2xl">📈</div>
          <div className="text-2xl font-bold text-white mb-1">18%</div>
          <div className="text-gray-300 text-sm">Efficiency Improvement</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
          <div className="w-8 h-8 text-purple-400 mx-auto mb-3 text-2xl">🌱</div>
          <div className="text-2xl font-bold text-white mb-1">{totalCO2Reduction}</div>
          <div className="text-gray-300 text-sm">CO₂ Tons Reduced</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Route Analysis Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-gray-300 font-medium pb-3">Route</th>
                <th className="text-gray-300 font-medium pb-3">Distance</th>
                <th className="text-gray-300 font-medium pb-3">Current Cost</th>
                <th className="text-gray-300 font-medium pb-3">Optimized Cost</th>
                <th className="text-gray-300 font-medium pb-3">Savings</th>
                <th className="text-gray-300 font-medium pb-3">CO₂ Reduction</th>
              </tr>
            </thead>
            <tbody>
              {routeData.map((route, index) => (
                <tr 
                  key={index} 
                  className="border-b border-white/10"
                >
                  <td className="text-white py-3 flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-blue-400" />
                    {route.route}
                  </td>
                  <td className="text-gray-300 py-3">{route.distance}</td>
                  <td className="text-gray-300 py-3">${route.current}</td>
                  <td className="text-green-400 py-3 font-medium">${route.optimized}</td>
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

      <div className="bg-white/10 rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Optimization Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="text-green-400 text-lg">✓</div>
            <div>
              <div className="text-green-300 font-medium">Route Consolidation</div>
              <div className="text-gray-300 text-sm">Combine Routes A & B for additional 12% savings</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="text-blue-400 text-lg">💡</div>
            <div>
              <div className="text-blue-300 font-medium">Peak Hour Avoidance</div>
              <div className="text-gray-300 text-sm">Schedule deliveries during off-peak hours to reduce fuel costs</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="text-purple-400 text-lg">🚛</div>
            <div>
              <div className="text-purple-300 font-medium">Vehicle Optimization</div>
              <div className="text-gray-300 text-sm">Use larger vehicles for Route C to maximize efficiency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;