import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CubeTransparentIcon, EyeIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

const ARProductViewer = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('3d');
  const [isARActive, setIsARActive] = useState(false);

  const products = [
    { id: 1, name: 'Oil Barrel', model: '🛢️', description: 'Premium crude oil container', specs: '200L capacity, Steel construction' },
    { id: 2, name: 'Gas Tank', model: '⛽', description: 'High-pressure gas storage', specs: '500L capacity, Aluminum alloy' },
    { id: 3, name: 'Pipeline Valve', model: '🔧', description: 'Industrial control valve', specs: '12" diameter, Stainless steel' },
    { id: 4, name: 'Refinery Unit', model: '🏭', description: 'Modular processing unit', specs: '10m x 5m x 8m, Automated control' }
  ];

  const startAR = () => {
    setIsARActive(true);
    // Simulate AR camera access
    setTimeout(() => {
      alert('AR mode activated! Point your camera at a flat surface to place the 3D model.');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <CubeTransparentIcon className="w-8 h-8 text-cyan-400" />
          AR/VR Product Viewer
        </h2>
        <p className="text-gray-300">Interactive 3D models and augmented reality visualization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedProduct(product)}
            className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
              selectedProduct?.id === product.id
                ? 'bg-cyan-500/20 border-cyan-500'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-6xl mb-3"
              >
                {product.model}
              </motion.div>
              <h3 className="text-white font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-300 text-sm">{product.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/10 rounded-lg p-6 border border-white/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">{selectedProduct.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === '3d' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  3D View
                </button>
                <button
                  onClick={() => setViewMode('ar')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'ar' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  AR Mode
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/20 rounded-lg p-8 text-center border border-white/10">
                {viewMode === '3d' ? (
                  <div>
                    <motion.div
                      animate={{ 
                        rotateY: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="text-8xl mb-4"
                    >
                      {selectedProduct.model}
                    </motion.div>
                    <p className="text-white mb-4">Interactive 3D Model</p>
                    <div className="flex justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                      >
                        <EyeIcon className="w-4 h-4" />
                        Inspect
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg flex items-center gap-2"
                      >
                        <ArrowsPointingOutIcon className="w-4 h-4" />
                        Fullscreen
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-8xl mb-4"
                      >
                        📱
                      </motion.div>
                      <div className="absolute inset-0 border-2 border-dashed border-cyan-400 rounded-lg animate-pulse"></div>
                    </div>
                    <p className="text-white mb-4">AR Camera View</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startAR}
                      className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold"
                    >
                      {isARActive ? 'AR Active' : 'Start AR Experience'}
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Product Details</h4>
                  <p className="text-gray-300">{selectedProduct.description}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Specifications</h4>
                  <p className="text-gray-300">{selectedProduct.specs}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">AR Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">360° rotation view</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Scale adjustment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Surface detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">Measurement tools</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">VR Compatibility</h4>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">Oculus</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">HTC Vive</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">WebXR</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-lg p-6 border border-white/20 text-center">
          <div className="text-4xl mb-3">🥽</div>
          <h3 className="text-white font-semibold mb-2">VR Warehouse Tours</h3>
          <p className="text-gray-300 text-sm">Virtual reality facility walkthroughs</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-6 border border-white/20 text-center">
          <div className="text-4xl mb-3">📐</div>
          <h3 className="text-white font-semibold mb-2">AR Measurements</h3>
          <p className="text-gray-300 text-sm">Real-world scale and dimensions</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-6 border border-white/20 text-center">
          <div className="text-4xl mb-3">🎮</div>
          <h3 className="text-white font-semibold mb-2">Interactive Controls</h3>
          <p className="text-gray-300 text-sm">Touch, gesture, and voice controls</p>
        </div>
      </div>
    </div>
  );
};

export default ARProductViewer;