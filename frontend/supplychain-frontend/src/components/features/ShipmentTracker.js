import React, { useState } from 'react';
import { MagnifyingGlassIcon, TruckIcon, MapPinIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ShipmentTracker = ({ transactions, onTrackingResult }) => {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID');
      return;
    }

    setIsTracking(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transaction = transactions.find(t => 
        t.transactionId.toLowerCase().includes(trackingId.toLowerCase()) ||
        t.trackingNumber?.toLowerCase().includes(trackingId.toLowerCase())
      );

      if (transaction) {
        onTrackingResult(transaction);
        toast.success('Shipment found!');
      } else {
        toast.error('Shipment not found');
      }
    } catch (error) {
      toast.error('Tracking failed');
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="stat-card" style={{ minHeight: '200px' }}>
      <h3 className="flex items-center gap-2 mb-3">
        <TruckIcon className="w-5 h-5" />
        Track Shipment
      </h3>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter tracking ID..."
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
          />
          <button
            onClick={handleTrack}
            disabled={isTracking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
          >
            {isTracking ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <MagnifyingGlassIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="text-xs text-gray-600">
          <div className="flex items-center gap-1 mb-1">
            <MapPinIcon className="w-3 h-3" />
            Recent IDs: 
          </div>
          <div className="space-y-1">
            {transactions.slice(0, 3).map((t, i) => (
              <button
                key={i}
                onClick={() => setTrackingId(t.transactionId)}
                className="block text-blue-600 hover:underline"
              >
                {t.transactionId}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracker;