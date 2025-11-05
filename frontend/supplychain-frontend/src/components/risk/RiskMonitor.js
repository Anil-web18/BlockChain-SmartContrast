import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

const RiskMonitor = () => {
  const [risks, setRisks] = useState([]);
  const [overallRisk, setOverallRisk] = useState('medium');

  useEffect(() => {
    const riskData = [
      { id: 1, type: 'Weather', level: 'high', probability: 78, impact: 'Severe storms in Houston area', mitigation: 'Reroute via Dallas', eta: '2 hours' },
      { id: 2, type: 'Supplier', level: 'medium', probability: 45, impact: 'Supplier B delivery delay', mitigation: 'Activate backup supplier', eta: '1 day' },
      { id: 3, type: 'Geopolitical', level: 'low', probability: 23, impact: 'Trade policy changes', mitigation: 'Monitor regulations', eta: '1 week' },
      { id: 4, type: 'Cyber Security', level: 'medium', probability: 56, impact: 'Potential system breach', mitigation: 'Enhanced monitoring', eta: 'Ongoing' },
      { id: 5, type: 'Market', level: 'high', probability: 82, impact: 'Oil price volatility', mitigation: 'Hedge positions', eta: 'Immediate' }
    ];
    
    setRisks(riskData);
    
    const highRisks = riskData.filter(r => r.level === 'high').length;
    setOverallRisk(highRisks > 2 ? 'critical' : highRisks > 0 ? 'high' : 'medium');
  }, []);

  const getRiskColor = (level) => {
    switch(level) {
      case 'critical': return 'red';
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getRiskIcon = (type) => {
    const icons = {
      'Weather': '🌩️',
      'Supplier': '🏭',
      'Geopolitical': '🌍',
      'Cyber Security': '🔒',
      'Market': '📈'
    };
    return icons[type] || '⚠️';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
          Supply Chain Risk Monitor
        </h2>
        <p className="text-gray-300">Real-time risk assessment and mitigation strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`bg-white/10 rounded-lg p-4 text-center border-l-4 border-${getRiskColor(overallRisk)}-500`}>
          <div className={`text-2xl font-bold text-${getRiskColor(overallRisk)}-400 mb-1 uppercase`}>
            {overallRisk}
          </div>
          <div className="text-gray-300 text-sm">Overall Risk Level</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {risks.filter(r => r.level === 'high').length}
          </div>
          <div className="text-gray-300 text-sm">High Risk Alerts</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {risks.filter(r => r.level === 'medium').length}
          </div>
          <div className="text-gray-300 text-sm">Medium Risk Items</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-400 mb-1">94%</div>
          <div className="text-gray-300 text-sm">Mitigation Success</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Active Risk Assessment</h3>
        <div className="space-y-4">
          {risks.map((risk, index) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 border-${getRiskColor(risk.level)}-500 bg-${getRiskColor(risk.level)}-500/10`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getRiskIcon(risk.type)}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">{risk.type} Risk</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getRiskColor(risk.level)}-500/20 text-${getRiskColor(risk.level)}-300 uppercase`}>
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{risk.impact}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <ShieldCheckIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300">{risk.mitigation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">ETA: {risk.eta}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold text-${getRiskColor(risk.level)}-400`}>
                    {risk.probability}%
                  </div>
                  <div className="text-gray-400 text-xs">Probability</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Trends</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">This Week</span>
              <span className="text-red-400">↗ +15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">This Month</span>
              <span className="text-green-400">↘ -8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">This Quarter</span>
              <span className="text-yellow-400">→ Stable</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Automated Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm">Backup supplier activated</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm">Route optimization in progress</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-300 text-sm">Weather monitoring active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMonitor;