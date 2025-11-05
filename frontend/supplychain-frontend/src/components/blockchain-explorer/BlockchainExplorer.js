import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CubeIcon, LinkIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const BlockchainExplorer = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchHash, setSearchHash] = useState('');

  useEffect(() => {
    const generateBlocks = () => {
      const blockData = [];
      for (let i = 0; i < 10; i++) {
        blockData.push({
          id: i + 1,
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          previousHash: i === 0 ? '0x0000000000000000' : `0x${Math.random().toString(16).substr(2, 64)}`,
          timestamp: new Date(Date.now() - i * 600000).toISOString(),
          transactions: Math.floor(Math.random() * 10) + 1,
          miner: `0x${Math.random().toString(16).substr(2, 40)}`,
          gasUsed: Math.floor(Math.random() * 8000000) + 2000000,
          size: Math.floor(Math.random() * 50000) + 10000
        });
      }
      setBlocks(blockData);
    };

    generateBlocks();
  }, []);

  const transactions = [
    { id: 1, hash: '0xabc123...', from: '0x1234...', to: '0x5678...', value: '2.5 ETH', gas: '21000', status: 'success' },
    { id: 2, hash: '0xdef456...', from: '0x9abc...', to: '0xdef0...', value: '1.8 ETH', gas: '45000', status: 'success' },
    { id: 3, hash: '0x789xyz...', from: '0x2468...', to: '0x1357...', value: '0.5 ETH', gas: '21000', status: 'pending' }
  ];

  const smartContracts = [
    { address: '0xSupplyChain001', name: 'Supply Chain Tracker', functions: 12, verified: true },
    { address: '0xPayment002', name: 'Automated Payments', functions: 8, verified: true },
    { address: '0xQuality003', name: 'Quality Assurance', functions: 6, verified: false }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <CubeIcon className="w-8 h-8 text-orange-400" />
          Blockchain Explorer
        </h2>
        <p className="text-gray-300">Explore blocks, transactions, and smart contracts</p>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={searchHash}
          onChange={(e) => setSearchHash(e.target.value)}
          placeholder="Search by hash, address, or block number..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold"
        >
          Search
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-orange-500">
          <div className="text-2xl font-bold text-orange-400 mb-1">2,847,392</div>
          <div className="text-gray-300 text-sm">Latest Block</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-400 mb-1">15.2s</div>
          <div className="text-gray-300 text-sm">Block Time</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-400 mb-1">1,247</div>
          <div className="text-gray-300 text-sm">Pending TXs</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center border-l-4 border-purple-500">
          <div className="text-2xl font-bold text-purple-400 mb-1">45 Gwei</div>
          <div className="text-gray-300 text-sm">Gas Price</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CubeIcon className="w-6 h-6 text-orange-400" />
            Latest Blocks
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBlock(block)}
                className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white font-semibold">Block #{block.id}</div>
                    <div className="text-gray-400 text-sm font-mono">
                      {block.hash.substring(0, 16)}...
                    </div>
                    <div className="text-gray-300 text-sm">
                      {block.transactions} transactions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">
                      {new Date(block.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-green-400 text-sm">
                      {(block.size / 1000).toFixed(1)} KB
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-blue-400" />
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-white/5 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-white font-mono text-sm">
                    {tx.hash}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    tx.status === 'success' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {tx.status === 'success' ? <CheckCircleIcon className="w-3 h-3 inline mr-1" /> : <ClockIcon className="w-3 h-3 inline mr-1" />}
                    {tx.status}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-gray-400">
                    From: {tx.from}
                  </div>
                  <div className="text-blue-400 font-semibold">
                    {tx.value}
                  </div>
                </div>
                <div className="text-gray-400 text-sm">
                  To: {tx.to}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedBlock && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-6 border border-white/20"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Block #{selectedBlock.id} Details</h3>
            <button
              onClick={() => setSelectedBlock(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="text-gray-400 text-sm">Block Hash</div>
                <div className="text-white font-mono text-sm break-all">{selectedBlock.hash}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Previous Hash</div>
                <div className="text-white font-mono text-sm break-all">{selectedBlock.previousHash}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Timestamp</div>
                <div className="text-white">{new Date(selectedBlock.timestamp).toLocaleString()}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-gray-400 text-sm">Transactions</div>
                <div className="text-white">{selectedBlock.transactions}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Miner</div>
                <div className="text-white font-mono text-sm break-all">{selectedBlock.miner}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Gas Used</div>
                <div className="text-white">{selectedBlock.gasUsed.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white/10 rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Smart Contracts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {smartContracts.map((contract, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-semibold">{contract.name}</h4>
                {contract.verified && (
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                )}
              </div>
              <div className="text-gray-400 text-sm font-mono mb-2">
                {contract.address}
              </div>
              <div className="text-gray-300 text-sm">
                {contract.functions} functions
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainExplorer;