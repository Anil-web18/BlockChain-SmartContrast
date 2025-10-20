import React, { useState, useEffect } from 'react';
import { ThermometerIcon, BeakerIcon } from '@heroicons/react/24/outline';

const IoTSensorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 25,
    pressure: 1013,
    quality: 98.5,
    flow: 150
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        pressure: prev.pressure + (Math.random() - 0.5) * 10,
        quality: Math.max(95, prev.quality + (Math.random() - 0.5) * 1),
        flow: prev.flow + (Math.random() - 0.5) * 20
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Live IoT Sensors</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded">
          <ThermometerIcon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <p className="text-2xl font-bold">{sensorData.temperature.toFixed(1)}°C</p>
          <p className="text-sm text-gray-600">Temperature</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded">
          <BeakerIcon className="w-8 h-8 mx-auto text-green-600 mb-2" />
          <p className="text-2xl font-bold">{sensorData.quality.toFixed(1)}%</p>
          <p className="text-sm text-gray-600">Quality</p>
        </div>
      </div>
    </div>
  );
};

export default IoTSensorDashboard;