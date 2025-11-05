import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SignalIcon, MapPinIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const IoTSensorDashboard = () => {
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const generateSensorData = () => {
      const newSensors = [
        { id: 1, name: 'Warehouse A', temp: Math.random() * 10 + 15, humidity: Math.random() * 20 + 40, location: 'Houston, TX', status: 'active' },
        { id: 2, name: 'Truck #247', temp: Math.random() * 15 + 10, humidity: Math.random() * 30 + 35, location: 'Dallas, TX', status: 'active' },
        { id: 3, name: 'Pipeline Station', temp: Math.random() * 8 + 20, humidity: Math.random() * 25 + 45, location: 'Austin, TX', status: 'warning' }
      ];
      setSensors(newSensors);

      const newAlerts = newSensors.filter(s => s.temp > 25 || s.humidity > 60).map(s => ({
        id: s.id,
        message: `${s.name}: ${s.temp > 25 ? 'High Temperature' : 'High Humidity'}`,
        severity: s.temp > 28 ? 'critical' : 'warning'
      }));
      setAlerts(newAlerts);
    };

    generateSensorData();
    const interval = setInterval(generateSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <SignalIcon className="w-8 h-8 text-green-400" />
          IoT Sensor Dashboard
        </h2>
        <p className="text-gray-300">Real-time monitoring of supply chain conditions</p>
      </div>

      {alerts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5" />
            Active Alerts
          </h3>
          {alerts.map(alert => (
            <div key={alert.id} className="text-red-200 text-sm">{alert.message}</div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensors.map((sensor, index) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/10 rounded-lg p-6 border ${
              sensor.status === 'warning' ? 'border-yellow-500/50' : 'border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">{sensor.name}</h3>
              <div className={`w-3 h-3 rounded-full ${
                sensor.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
              } animate-pulse`} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🌡️ Temperature:</span>
                <span className={`font-bold ${sensor.temp > 25 ? 'text-red-400' : 'text-blue-400'}`}>
                  {sensor.temp.toFixed(1)}°C
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400">💧 Humidity:</span>
                <span className={`font-bold ${sensor.humidity > 60 ? 'text-red-400' : 'text-green-400'}`}>
                  {sensor.humidity.toFixed(1)}%
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{sensor.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IoTSensorDashboard;