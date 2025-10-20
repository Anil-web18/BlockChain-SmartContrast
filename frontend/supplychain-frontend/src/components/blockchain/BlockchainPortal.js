import React, { useState } from 'react';
import { 
  CubeIcon,
  WalletIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import WalletManager from './WalletManager';
import BlockchainTransaction from './BlockchainTransaction';

const BlockchainPortal = ({ user, onBack }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'wallet', label: 'Wallet', icon: WalletIcon },
    { id: 'transaction', label: 'Send Transaction', icon: PaperAirplaneIcon },
    { id: 'blocks', label: 'Blockchain', icon: CubeIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">Blockchain Operations</h1>
            </div>
            <div className="text-sm">
              <span className="opacity-70">Welcome, </span>
              <span className="font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-screen">
          <nav className="p-6 space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeSection === section.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Blockchain Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Network Status</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-2xl font-bold text-green-400">Active</p>
                  <p className="text-sm opacity-70">Ethereum Mainnet</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4">Gas Price</h3>
                  <p className="text-2xl font-bold text-blue-400">25 Gwei</p>
                  <p className="text-sm opacity-70">Current network fee</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4">Block Height</h3>
                  <p className="text-2xl font-bold text-purple-400">18,542,891</p>
                  <p className="text-sm opacity-70">Latest block</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Oil & Gas Blockchain Workflow</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: 1, title: 'Extract', desc: 'Oil extraction recorded on blockchain' },
                    { step: 2, title: 'Transport', desc: 'Shipment tracking with smart contracts' },
                    { step: 3, title: 'Refine', desc: 'Processing data stored immutably' },
                    { step: 4, title: 'Distribute', desc: 'Final delivery with OGC payments' }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                        {item.step}
                      </div>
                      <h4 className="font-medium mb-1 text-sm">{item.title}</h4>
                      <p className="text-xs opacity-70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Blockchain-Enabled Oil & Gas Companies</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Shell', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Shell-Logo.png', blockchain: 'Ethereum', use: 'Carbon Credits Trading' },
                    { name: 'BP', logo: 'https://logos-world.net/wp-content/uploads/2020/09/BP-Logo.png', blockchain: 'Hyperledger', use: 'Supply Chain Tracking' },
                    { name: 'ExxonMobil', logo: 'https://logos-world.net/wp-content/uploads/2020/09/ExxonMobil-Logo.png', blockchain: 'Private Chain', use: 'Asset Management' },
                    { name: 'Chevron', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Chevron-Logo.png', blockchain: 'Ethereum', use: 'Smart Contracts' },
                    { name: 'TotalEnergies', logo: 'https://logos-world.net/wp-content/uploads/2021/05/TotalEnergies-Logo.png', blockchain: 'Polygon', use: 'Green Energy Certificates' },
                    { name: 'ConocoPhillips', logo: 'https://logos-world.net/wp-content/uploads/2020/09/ConocoPhillips-Logo.png', blockchain: 'Binance Smart Chain', use: 'Payment Processing' },
                    { name: 'Equinor', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Equinor-Logo.png', blockchain: 'Ethereum', use: 'Renewable Energy Trading' },
                    { name: 'Eni', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Eni-Logo.png', blockchain: 'Hyperledger Fabric', use: 'Document Verification' },
                    { name: 'Petrobras', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Petrobras-Logo.png', blockchain: 'Ethereum', use: 'Commodity Trading' }
                  ].map((company, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4 flex items-center justify-between hover:bg-black/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                            {company.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{company.name}</h4>
                          <p className="text-sm text-blue-300">{company.blockchain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white font-medium">{company.use}</p>
                        <p className="text-xs opacity-70">Blockchain Implementation</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'wallet' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Blockchain Wallet</h2>
              <div className="max-w-2xl">
                <WalletManager user={user} />
              </div>
            </div>
          )}

          {activeSection === 'transaction' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Send Blockchain Transaction</h2>
              <div className="max-w-2xl">
                <BlockchainTransaction user={user} />
              </div>
            </div>
          )}

          {activeSection === 'blocks' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Blockchain Explorer</h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Recent Blocks</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((block, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <CubeIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Block #{18542891 - index}</p>
                          <p className="text-xs opacity-70">{3 + index} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs">0x742d35...3b8D</p>
                        <p className="text-xs opacity-70">{index + 1} min ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Supply Chain Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-green-400">1,247</p>
                    <p className="text-xs opacity-70">Total Transactions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-blue-400">89</p>
                    <p className="text-xs opacity-70">Active Contracts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-purple-400">156K</p>
                    <p className="text-xs opacity-70">OGC Circulating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-orange-400">99.9%</p>
                    <p className="text-xs opacity-70">Uptime</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlockchainPortal;