import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TruckIcon,
  MapIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  BoltIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const OperationalDashboard = () => {
  const [liveData, setLiveData] = useState({
    activeShipments: 1247,
    onTimeDeliveries: 98.3,
    delayedShipments: 23,
    criticalAlerts: 5,
    fuelEfficiency: 87.2,
    driverUtilization: 94.1
  });

  const [shipments, setShipments] = useState([
    { id: 'SH001', route: 'NYC → LA', status: 'in-transit', progress: 65, eta: '2h 30m', driver: 'John D.' },
    { id: 'SH002', route: 'CHI → MIA', status: 'delivered', progress: 100, eta: 'Delivered', driver: 'Sarah M.' },
    { id: 'SH003', route: 'SEA → DEN', status: 'delayed', progress: 45, eta: '4h 15m', driver: 'Mike R.' },
    { id: 'SH004', route: 'BOS → ATL', status: 'in-transit', progress: 78, eta: '1h 45m', driver: 'Lisa K.' },
    { id: 'SH005', route: 'SF → LV', status: 'loading', progress: 15, eta: '6h 20m', driver: 'Tom W.' }
  ]);

  const StatusCard = ({ title, value, subtitle, icon: Icon, color, pulse = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, rotateX: 5 }}
      className={`relative overflow-hidden rounded-2xl p-6 ${color} backdrop-blur-xl border border-white/20 shadow-xl`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          <div className="text-white/90 font-medium text-sm">{title}</div>
          {subtitle && <div className="text-white/70 text-xs mt-1">{subtitle}</div>}
        </div>
        <div className={`p-3 rounded-xl bg-white/20 ${pulse ? 'animate-pulse' : ''}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {pulse && (
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
      )}
    </motion.div>
  );

  const ShipmentRow = ({ shipment, index }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'delivered': return 'text-green-400 bg-green-500/20';
        case 'in-transit': return 'text-blue-400 bg-blue-500/20';
        case 'delayed': return 'text-red-400 bg-red-500/20';
        case 'loading': return 'text-yellow-400 bg-yellow-500/20';
        default: return 'text-gray-400 bg-gray-500/20';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'delivered': return CheckCircleIcon;
        case 'in-transit': return TruckIcon;
        case 'delayed': return ExclamationTriangleIcon;
        case 'loading': return CogIcon;
        default: return ClockIcon;
      }
    };

    const StatusIcon = getStatusIcon(shipment.status);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${getStatusColor(shipment.status)}`}>
            <StatusIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-medium">{shipment.id}</div>
            <div className="text-white/60 text-sm">{shipment.route}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-white/80 text-sm">Driver</div>
            <div className="text-white font-medium text-sm">{shipment.driver}</div>
          </div>
          
          <div className="w-24">
            <div className="flex justify-between text-xs text-white/60 mb-1">
              <span>Progress</span>
              <span>{shipment.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${shipment.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-2 rounded-full ${
                  shipment.status === 'delivered' ? 'bg-green-500' :
                  shipment.status === 'delayed' ? 'bg-red-500' :
                  'bg-blue-500'
                }`}
              />
            </div>
          </div>
          
          <div className="text-right min-w-[60px]">
            <div className="text-white/80 text-sm">ETA</div>
            <div className="text-white font-medium text-sm">{shipment.eta}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  const LiveMetrics = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Fuel Efficiency', value: '87.2%', color: 'text-green-400' },
        { label: 'Driver Utilization', value: '94.1%', color: 'text-blue-400' },
        { label: 'Route Optimization', value: '91.8%', color: 'text-purple-400' },
        { label: 'Cost per Mile', value: '$2.34', color: 'text-orange-400' }
      ].map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
          <div className="text-white/70 text-sm">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">⚡ Operational Dashboard</h1>
          <p className="text-white/70">Real-time operations monitoring and control</p>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Active Shipments"
            value="1,247"
            subtitle="Currently in transit"
            icon={TruckIcon}
            color="bg-gradient-to-br from-blue-600/80 to-blue-800/80"
            pulse={true}
          />
          <StatusCard
            title="On-Time Deliveries"
            value="98.3%"
            subtitle="Last 24 hours"
            icon={CheckCircleIcon}
            color="bg-gradient-to-br from-green-600/80 to-green-800/80"
          />
          <StatusCard
            title="Delayed Shipments"
            value="23"
            subtitle="Requires attention"
            icon={ExclamationTriangleIcon}
            color="bg-gradient-to-br from-red-600/80 to-red-800/80"
            pulse={true}
          />
          <StatusCard
            title="Critical Alerts"
            value="5"
            subtitle="Immediate action needed"
            icon={BoltIcon}
            color="bg-gradient-to-br from-orange-600/80 to-orange-800/80"
            pulse={true}
          />
        </div>

        {/* Live Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">📊 Live Performance Metrics</h3>
          <LiveMetrics />
        </motion.div>

        {/* Active Shipments Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">🚛 Active Shipments</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm">Live Updates</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {shipments.map((shipment, index) => (
              <ShipmentRow key={shipment.id} shipment={shipment} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OperationalDashboard;