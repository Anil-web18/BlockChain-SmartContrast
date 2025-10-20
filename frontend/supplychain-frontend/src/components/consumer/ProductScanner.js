import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCodeIcon, 
  MagnifyingGlassIcon,
  CameraIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ProductScanner = ({ onProductScanned, transactions }) => {
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const sampleProducts = [
    { id: 'TX00001', name: 'Premium Crude Oil', type: 'Oil' },
    { id: 'TX00002', name: 'Natural Gas', type: 'Gas' },
    { id: 'TX00003', name: 'Refined Gasoline', type: 'Fuel' },
    { id: 'TX00004', name: 'Diesel Fuel', type: 'Fuel' },
    { id: 'TX00005', name: 'Jet Fuel', type: 'Aviation' }
  ];

  const handleScan = () => {
    setIsScanning(true);
    toast.loading('Scanning QR code...', { id: 'scan' });
    
    setTimeout(() => {
      const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      onProductScanned(randomProduct.id);
      setIsScanning(false);
      toast.success(`Found ${randomProduct.name}!`, { id: 'scan' });
    }, 2000);
  };

  const handleManualLookup = () => {
    if (manualInput.trim()) {
      const product = sampleProducts.find(p => p.id === manualInput.trim());
      if (product) {
        toast.success(`Loading ${product.name}...`);
      } else {
        toast.success('Loading product data...');
      }
      onProductScanned(manualInput.trim());
      setManualInput('');
    }
  };

  const handleSampleClick = (productId) => {
    const product = sampleProducts.find(p => p.id === productId);
    toast.success(`Loading ${product.name}...`);
    onProductScanned(productId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* QR Scanner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <QrCodeIcon className="w-6 h-6" />
          QR Code Scanner
        </h3>
        
        <div className={`w-48 h-48 border-3 border-dashed border-blue-400 rounded-2xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
          isScanning ? 'bg-blue-500/20 border-blue-300' : 'bg-white/10 border-blue-400'
        }`}>
          {isScanning ? (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-3"
              />
              <p className="text-blue-400 text-sm font-medium">Scanning...</p>
            </div>
          ) : (
            <div className="text-center">
              <CameraIcon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">Point camera at QR code</p>
            </div>
          )}
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`btn-modern w-full mb-4 ${
            isScanning ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'
          }`}
        >
          {isScanning ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Scanning...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <CameraIcon className="w-5 h-5" />
              Start Camera Scan
            </div>
          )}
        </button>

        <p className="text-xs text-gray-300">
          Demo: Simulates scanning random product
        </p>
      </motion.div>

      {/* Manual Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6"
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MagnifyingGlassIcon className="w-6 h-6" />
          Manual Product Lookup
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Product ID or Transaction ID
          </label>
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Enter TX00001 or Item ID"
            className="input-modern text-gray-900 placeholder-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && handleManualLookup()}
          />
        </div>

        <button
          onClick={handleManualLookup}
          disabled={!manualInput.trim()}
          className={`btn-modern w-full mb-6 ${
            !manualInput.trim() ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-success'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <MagnifyingGlassIcon className="w-5 h-5" />
            Track Product
          </div>
        </button>

        {/* Sample Product IDs */}
        <div className="bg-white/10 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4" />
            Try these sample products:
          </h4>
          <div className="space-y-2">
            {sampleProducts.slice(0, 3).map((product, index) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleSampleClick(product.id)}
                className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {product.name}
                    </div>
                    <div className="text-gray-400 text-sm">{product.id} • {product.type}</div>
                  </div>
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default ProductScanner;