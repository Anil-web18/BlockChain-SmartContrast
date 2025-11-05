import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, TruckIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const CarbonFootprintTracker = () => {
  const [selectedRoute, setSelectedRoute] = useState('all');

  const footprintData = [
    { route: 'Route A', distance: 245, co2: 58.8, fuel: 24.5, trees: 2.6 },
    { route: 'Route B', distance: 180, co2: 43.2, fuel: 18.0, trees: 1.9 },
    { route: 'Route C', distance: 420, co2: 100.8, fuel: 42.0, trees: 4.5 }
  ];

  const totalFootprint = footprintData.reduce((sum, route) => ({
    co2: sum.co2 + route.co2,
    fuel: sum.fuel + route.fuel,
    trees: sum.trees + route.trees
  }), { co2: 0, fuel: 0, trees: 0 });

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Route,Distance(km),CO2(kg),Fuel(L),Trees Needed\n"
      + footprintData.map(r => `${r.route},${r.distance},${r.co2},${r.fuel},${r.trees}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `carbon-footprint-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SparklesIcon className="w-8 h-8 text-green-400" />
            Carbon Footprint Tracker
          </h2>
          <p className="text-gray-300">Environmental impact monitoring and sustainability metrics</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-400 mb-1">{totalFootprint.co2.toFixed(1)} kg</div>
          <div className="text-gray-300 text-sm">Total CO₂ Emissions</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-400 mb-1">{totalFootprint.fuel.toFixed(1)} L</div>
          <div className="text-gray-300 text-sm">Fuel Consumed</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-400 mb-1">{totalFootprint.trees.toFixed(1)}</div>
          <div className="text-gray-300 text-sm">Trees to Offset</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-purple-500">
          <div className="text-2xl font-bold text-purple-400 mb-1">B+</div>
          <div className="text-gray-300 text-sm">Sustainability Grade</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Route Environmental Impact</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-gray-300 font-medium pb-3">Route</th>
                <th className="text-gray-300 font-medium pb-3">Distance</th>
                <th className="text-gray-300 font-medium pb-3">CO₂ Emissions</th>
                <th className="text-gray-300 font-medium pb-3">Fuel Usage</th>
                <th className="text-gray-300 font-medium pb-3">Trees Needed</th>
                <th className="text-gray-300 font-medium pb-3">Impact Level</th>
              </tr>
            </thead>
            <tbody>
              {footprintData.map((route, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="text-white py-3 flex items-center gap-2">
                    <TruckIcon className="w-4 h-4 text-blue-400" />
                    {route.route}
                  </td>
                  <td className="text-gray-300 py-3">{route.distance} km</td>
                  <td className="text-red-400 py-3 font-medium">{route.co2} kg</td>
                  <td className="text-blue-400 py-3">{route.fuel} L</td>
                  <td className="text-green-400 py-3">{route.trees}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      route.co2 > 80 ? 'bg-red-500/20 text-red-300' :
                      route.co2 > 50 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {route.co2 > 80 ? 'High' : route.co2 > 50 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Sustainability Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Carbon Neutral Target</span>
                <span className="text-green-400">73%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '73%' }}
                  transition={{ duration: 1.5 }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Fuel Efficiency</span>
                <span className="text-blue-400">86%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '86%' }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Green Initiatives</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-green-400 text-lg">🌱</div>
              <div>
                <div className="text-green-300 font-medium">Tree Planting Program</div>
                <div className="text-gray-300 text-sm">Plant 50 trees monthly to offset emissions</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-blue-400 text-lg">⚡</div>
              <div>
                <div className="text-blue-300 font-medium">Electric Fleet Transition</div>
                <div className="text-gray-300 text-sm">25% of fleet converted to electric vehicles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintTracker;