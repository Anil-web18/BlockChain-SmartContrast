import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  GlobeAltIcon, 
  BoltIcon,
  BeakerIcon,
  TruckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const SustainabilityCheck = ({ product }) => {
  const [sustainabilityData, setSustainabilityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setTimeout(() => {
        setSustainabilityData({
          overallScore: 87,
          carbonFootprint: {
            total: 2.4,
            unit: 'kg CO2e',
            breakdown: [
              { category: 'Production', value: 1.2, percentage: 50 },
              { category: 'Transportation', value: 0.8, percentage: 33 },
              { category: 'Packaging', value: 0.4, percentage: 17 }
            ]
          },
          waterUsage: {
            total: 15.6,
            unit: 'liters',
            efficiency: 'High'
          },
          energySource: {
            renewable: 78,
            nonRenewable: 22,
            sources: ['Solar', 'Wind', 'Natural Gas']
          },
          certifications: [
            { name: 'ISO 14001', status: 'Certified', icon: '🏆' },
            { name: 'Carbon Neutral', status: 'Verified', icon: '🌱' },
            { name: 'Sustainable Energy', status: 'Certified', icon: '⚡' },
            { name: 'Water Stewardship', status: 'Compliant', icon: '💧' }
          ],
          impactMetrics: {
            treesEquivalent: 0.12,
            recycledMaterials: 65,
            wasteReduction: 23
          }
        });
        setLoading(false);
      }, 1500);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="glass p-8 text-center">
        <SparklesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Product Selected</h3>
        <p className="text-gray-300">Please select a product to view sustainability metrics</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-white mb-2">Analyzing Sustainability</h3>
        <p className="text-gray-300">Calculating environmental impact metrics...</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SparklesIcon className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Sustainability Score</h2>
          </div>
          <div className={`text-4xl font-bold ${getScoreColor(sustainabilityData.overallScore)}`}>
            {sustainabilityData.overallScore}/100
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${getScoreBg(sustainabilityData.overallScore)}`}>
            <GlobeAltIcon className="w-6 h-6 text-green-400 mb-2" />
            <div className="text-lg font-semibold text-white">Environmental Impact</div>
            <div className="text-sm text-gray-300">Low carbon footprint</div>
          </div>
          <div className="bg-blue-500/20 p-4 rounded-lg">
            <BeakerIcon className="w-6 h-6 text-blue-400 mb-2" />
            <div className="text-lg font-semibold text-white">Water Efficiency</div>
            <div className="text-sm text-gray-300">{sustainabilityData.waterUsage.efficiency}</div>
          </div>
          <div className="bg-yellow-500/20 p-4 rounded-lg">
            <BoltIcon className="w-6 h-6 text-yellow-400 mb-2" />
            <div className="text-lg font-semibold text-white">Renewable Energy</div>
            <div className="text-sm text-gray-300">{sustainabilityData.energySource.renewable}%</div>
          </div>
        </div>
      </motion.div>

      {/* Carbon Footprint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <GlobeAltIcon className="w-6 h-6" />
          Carbon Footprint Analysis
        </h3>
        
        <div className="mb-4">
          <div className="text-3xl font-bold text-green-400 mb-1">
            {sustainabilityData.carbonFootprint.total} {sustainabilityData.carbonFootprint.unit}
          </div>
          <div className="text-sm text-gray-300">Total carbon emissions for this product</div>
        </div>

        <div className="space-y-3">
          {sustainabilityData.carbonFootprint.breakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-white">{item.category}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-gray-300 text-sm w-16">{item.value} kg</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Environmental Certifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sustainabilityData.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-white/10 rounded-lg"
            >
              <span className="text-2xl">{cert.icon}</span>
              <div>
                <div className="text-white font-medium">{cert.name}</div>
                <div className="text-green-400 text-sm">{cert.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Impact Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Environmental Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl mb-2">🌳</div>
            <div className="text-2xl font-bold text-green-400">{sustainabilityData.impactMetrics.treesEquivalent}</div>
            <div className="text-sm text-gray-300">Trees Planted Equivalent</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl mb-2">♻️</div>
            <div className="text-2xl font-bold text-blue-400">{sustainabilityData.impactMetrics.recycledMaterials}%</div>
            <div className="text-sm text-gray-300">Recycled Materials</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl mb-2">🗑️</div>
            <div className="text-2xl font-bold text-purple-400">{sustainabilityData.impactMetrics.wasteReduction}%</div>
            <div className="text-sm text-gray-300">Waste Reduction</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SustainabilityCheck;