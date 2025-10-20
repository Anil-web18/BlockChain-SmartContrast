import React from 'react';
import { MapPinIcon, TruckIcon } from '@heroicons/react/24/outline';

const SupplyChainMap = ({ shipmentData }) => {
  const stages = [
    { name: 'Extraction', location: 'Texas, USA', status: 'completed' },
    { name: 'Refinery', location: 'Houston, TX', status: 'completed' },
    { name: 'Distribution', location: 'Chicago, IL', status: 'in-progress' },
    { name: 'Delivery', location: 'New York, NY', status: 'pending' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Supply Chain Journey</h3>
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              stage.status === 'completed' ? 'bg-green-500' :
              stage.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
            }`}>
              {stage.status === 'in-progress' ? 
                <TruckIcon className="w-4 h-4 text-white" /> :
                <MapPinIcon className="w-4 h-4 text-white" />
              }
            </div>
            <div>
              <p className="font-medium">{stage.name}</p>
              <p className="text-sm text-gray-600">{stage.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainMap;