import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuthenticityVerification from './AuthenticityVerification';
import SustainabilityCheck from './SustainabilityCheck';
import { 
  MapIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

const ProductJourney = ({ product }) => {
  const [activeTab, setActiveTab] = useState('journey');

  if (!product) {
    return (
      <div className="glass p-8 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No Product Selected</h3>
        <p className="text-gray-300">Please scan a product or enter a product ID to view its journey</p>
      </div>
    );
  }

  const tabs = [
    { id: 'journey', label: 'Product Journey', icon: MapIcon },
    { id: 'authenticity', label: 'Authenticity', icon: ShieldCheckIcon },
    { id: 'sustainability', label: 'Sustainability', icon: SparklesIcon },
    { id: 'documents', label: 'Documents', icon: DocumentTextIcon }
  ];

  const renderDocuments = () => (
    <div className="glass p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Product Documents</h3>
      <div className="space-y-4">
        {[
          { name: 'Quality Certificate', type: 'PDF', size: '2.4 MB', status: 'Verified' },
          { name: 'Safety Data Sheet', type: 'PDF', size: '1.8 MB', status: 'Current' },
          { name: 'Origin Certificate', type: 'PDF', size: '1.2 MB', status: 'Verified' },
          { name: 'Transport Documentation', type: 'PDF', size: '3.1 MB', status: 'Complete' }
        ].map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
            <div className="flex items-center gap-3">
              <DocumentTextIcon className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white font-medium">{doc.name}</div>
                <div className="text-gray-300 text-sm">{doc.type} • {doc.size}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                {doc.status}
              </span>
              <button className="btn-modern btn-secondary px-3 py-1 text-sm">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJourney = () => {
    const journeySteps = [
      {
        step: 1,
        title: 'Origin/Farm',
        location: 'Farm Location',
        date: new Date(product.timestamp).toLocaleDateString(),
        status: 'completed',
        icon: '🌱',
        details: `Supplier: ${product.supplierId}`
      },
      {
        step: 2,
        title: 'Processing',
        location: 'Processing Facility',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
        status: 'completed',
        icon: '🏭',
        details: 'Quality checked and processed'
      },
      {
        step: 3,
        title: 'Packaging',
        location: 'Packaging Center',
        date: new Date(Date.now() - 86400000 * 1).toLocaleDateString(),
        status: 'completed',
        icon: '📦',
        details: `Quantity: ${product.quantityShipped} units`
      },
      {
        step: 4,
        title: 'Distribution',
        location: product.location,
        date: new Date().toLocaleDateString(),
        status: product.orderStatus === 'Delivered' ? 'completed' : 'in-progress',
        icon: '🚚',
        details: `GPS: ${product.gpsCoordinates || 'Tracking...'}`
      },
      {
        step: 5,
        title: 'Retail Store',
        location: `Customer: ${product.customerId}`,
        date: product.orderStatus === 'Delivered' ? new Date().toLocaleDateString() : 'Pending',
        status: product.orderStatus === 'Delivered' ? 'completed' : 'pending',
        icon: '🏪',
        details: product.orderStatus === 'Delivered' ? 'Available for purchase' : 'In transit'
      }
    ];

    return (
      <div className="glass p-6">
        {/* Product Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <MapIcon className="w-6 h-6" />
            Product Journey
          </h2>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Product ID: {product.transactionId}
            </h3>
            <p className="text-gray-300 text-sm">Item: {product.itemId} | Value: ${product.orderAmount}</p>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>

          {journeySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start mb-8 relative"
            >
              {/* Step Icon */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl relative z-10 border-4 border-white shadow-lg ${
                step.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                step.status === 'in-progress' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-400'
              }`}>
                {step.icon}
              </div>

              {/* Step Content */}
              <div className="flex-1 ml-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-300 text-sm mb-1">📍 {step.location}</p>
                    <p className="text-gray-300 text-sm">📅 {step.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    step.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                    step.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {step.status === 'completed' ? '✅ Completed' : 
                     step.status === 'in-progress' ? '🔄 In Progress' : '⏳ Pending'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{step.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Environmental & Safety Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/20 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🌡️</div>
            <div className="text-xl font-bold text-blue-400">{product.temperature}°C</div>
            <div className="text-sm text-gray-300">Temperature</div>
          </div>
          <div className="bg-green-500/20 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">💧</div>
            <div className="text-xl font-bold text-green-400">{product.humidity}%</div>
            <div className="text-sm text-gray-300">Humidity</div>
          </div>
          <div className="bg-purple-500/20 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-xl font-bold text-purple-400">Verified</div>
            <div className="text-sm text-gray-300">Blockchain</div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'authenticity':
        return <AuthenticityVerification product={product} />;
      case 'sustainability':
        return <SustainabilityCheck product={product} />;
      case 'documents':
        return renderDocuments();
      default:
        return renderJourney();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default ProductJourney;