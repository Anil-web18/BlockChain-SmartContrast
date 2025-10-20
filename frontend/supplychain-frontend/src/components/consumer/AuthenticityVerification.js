import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';

const AuthenticityVerification = ({ product }) => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [verificationData, setVerificationData] = useState(null);

  useEffect(() => {
    if (product) {
      // Simulate verification process
      setTimeout(() => {
        setVerificationData({
          isAuthentic: true,
          blockchainHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          certificateId: `CERT-${product.transactionId}`,
          verifiedBy: 'Oil & Gas Blockchain Authority',
          verificationDate: new Date().toISOString(),
          authenticity: {
            score: 98,
            factors: [
              { name: 'Blockchain Verification', status: 'verified', score: 100 },
              { name: 'Digital Signature', status: 'verified', score: 100 },
              { name: 'Supply Chain Integrity', status: 'verified', score: 95 },
              { name: 'Quality Certificates', status: 'verified', score: 97 }
            ]
          }
        });
        setVerificationStatus('completed');
      }, 2000);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="glass p-8 text-center">
        <QrCodeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Product Selected</h3>
        <p className="text-gray-300">Please scan or select a product to verify authenticity</p>
      </div>
    );
  }

  if (verificationStatus === 'verifying') {
    return (
      <div className="glass p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-white mb-2">Verifying Authenticity</h3>
        <p className="text-gray-300">Checking blockchain records and certificates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verification Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            verificationData.isAuthentic ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {verificationData.isAuthentic ? (
              <CheckCircleIcon className="w-6 h-6 text-white" />
            ) : (
              <ExclamationTriangleIcon className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {verificationData.isAuthentic ? 'Authentic Product' : 'Verification Failed'}
            </h2>
            <p className="text-gray-300">
              Product ID: {product.transactionId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{verificationData.authenticity.score}%</div>
            <div className="text-sm text-gray-300">Authenticity Score</div>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="text-lg font-semibold text-white">{verificationData.verifiedBy}</div>
            <div className="text-sm text-gray-300">Verified By</div>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="text-lg font-semibold text-white">
              {new Date(verificationData.verificationDate).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-300">Verification Date</div>
          </div>
        </div>
      </motion.div>

      {/* Verification Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="w-6 h-6" />
          Verification Factors
        </h3>
        
        <div className="space-y-4">
          {verificationData.authenticity.factors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/10 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">{factor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-semibold">{factor.score}%</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {factor.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Blockchain Certificate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <DocumentTextIcon className="w-6 h-6" />
          Blockchain Certificate
        </h3>
        
        <div className="bg-white/10 p-4 rounded-lg space-y-3">
          <div>
            <label className="text-sm text-gray-300">Certificate ID</label>
            <div className="text-white font-mono text-sm">{verificationData.certificateId}</div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Blockchain Hash</label>
            <div className="text-white font-mono text-xs break-all">{verificationData.blockchainHash}</div>
          </div>
          <div>
            <label className="text-sm text-gray-300">Verification Authority</label>
            <div className="text-white">{verificationData.verifiedBy}</div>
          </div>
        </div>

        <button className="mt-4 btn-modern btn-primary w-full">
          Download Certificate
        </button>
      </motion.div>
    </div>
  );
};

export default AuthenticityVerification;