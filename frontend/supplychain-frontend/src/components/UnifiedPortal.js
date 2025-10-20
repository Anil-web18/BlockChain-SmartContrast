import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  ChartBarIcon, 
  CheckCircleIcon, 
  TruckIcon, 
  ClockIcon,
  ClipboardDocumentListIcon,
  GlobeAltIcon,
  CloudIcon,
  CubeTransparentIcon,
  ShoppingCartIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import ConsumerPortal from './consumer/ConsumerPortal';
import RealTimeTracker from './RealTimeTracker';
import SmartContract from './SmartContract';
import WalletManager from './blockchain/WalletManager';
import NotificationPanel from './NotificationPanel';
import ShipmentTracker from './features/ShipmentTracker';
import BlockchainTransaction from './blockchain/BlockchainTransaction';
import BlockchainPortal from './blockchain/BlockchainPortal';
import AnalyticsDashboard from './dashboards/AnalyticsDashboard';
import ExecutiveDashboard from './dashboards/ExecutiveDashboard';
import OperationalDashboard from './dashboards/OperationalDashboard';


const UnifiedPortal = ({ user, transactions, trackingResult, onLogout, setDarkMode, darkMode }) => {
  const [activeView, setActiveView] = useState('business');
  const [currentTrackingResult, setTrackingResult] = useState(trackingResult);
  const [showBlockchainPortal, setShowBlockchainPortal] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState('main');
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  const BusinessPortal = () => (
    <div className={darkMode ? 'app dark' : 'app'} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: '5%',
        right: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '10%',
        left: '3%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
        borderRadius: '50%',
        animation: 'float 12s ease-in-out infinite reverse',
        zIndex: 0
      }}></div>
      
      <header style={{ position: 'relative', zIndex: 10 }}>
        <div className="header-content" style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 0 20px 20px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h1 className="logo" style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '28px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>🚢 Supply Chain Portal</h1>
          <div className="header-nav" style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
            <button 
              onClick={() => setCurrentDashboard('main')} 
              style={{
                background: currentDashboard === 'main' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🏠 Main
            </button>
            <button 
              onClick={() => setCurrentDashboard('analytics')} 
              style={{
                background: currentDashboard === 'analytics' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📊 Analytics
            </button>
            <button 
              onClick={() => setCurrentDashboard('executive')} 
              style={{
                background: currentDashboard === 'executive' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🏢 Executive
            </button>
            <button 
              onClick={() => setCurrentDashboard('operational')} 
              style={{
                background: currentDashboard === 'operational' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ⚡ Operations
            </button>
          </div>
          <div className="header-actions">
            <button 
              onClick={() => setShowBlockchainPortal(true)}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '15px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}
            >
              🔗 Blockchain
            </button>
            <button 
              onClick={() => setActiveView(activeView === 'business' ? 'consumer' : 'business')}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '15px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }}
            >
              {activeView === 'business' ? '🛒 Consumer View' : '🏢 Business View'}
            </button>
            <span>Welcome, {user.name}</span>
            <button onClick={() => setDarkMode(!darkMode)} className="btn-secondary">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button onClick={onLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {currentDashboard === 'analytics' && <AnalyticsDashboard />}
        {currentDashboard === 'executive' && <ExecutiveDashboard />}
        {currentDashboard === 'operational' && <OperationalDashboard />}
        {currentDashboard === 'main' && (
        <div>
        <div className="hero" style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
          borderRadius: '20px',
          margin: '20px',
          padding: '60px 40px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              marginRight: '20px'
            }}>
              <GlobeAltIcon className="w-20 h-20 text-white" />
            </div>
            <div>
              <h2 style={{
                fontSize: '48px',
                background: 'linear-gradient(45deg, #fff, #f0f9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>Blockchain Supply Chain Management</h2>
              <p style={{
                fontSize: '20px',
                opacity: 0.95,
                fontWeight: '300'
              }}>Track and manage supply chain transactions with real-time data and blockchain verification.</p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="stats-grid" style={{ padding: '0 20px' }}>
          <div className="stat-card business-stat-card" style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>
              <ChartBarIcon className="w-6 h-6" />
            </div>
            <div className="stat-number" style={{ position: 'relative', zIndex: 2 }}>{transactions.length}</div>
            <div className="stat-label" style={{ position: 'relative', zIndex: 2 }}>Total Transactions</div>
          </div>
          <div className="stat-card business-stat-card" style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <div className="stat-number" style={{ position: 'relative', zIndex: 2 }}>{transactions.filter(t => t.orderStatus === 'Delivered').length}</div>
            <div className="stat-label" style={{ position: 'relative', zIndex: 2 }}>Delivered</div>
          </div>
          <div className="stat-card business-stat-card" style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>
              <TruckIcon className="w-6 h-6" />
            </div>
            <div className="stat-number" style={{ position: 'relative', zIndex: 2 }}>{transactions.filter(t => t.orderStatus === 'Shipped').length}</div>
            <div className="stat-label" style={{ position: 'relative', zIndex: 2 }}>Shipped</div>
          </div>
          <div className="stat-card business-stat-card" style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '8px', position: 'relative', zIndex: 2 }}>
              <ClockIcon className="w-6 h-6" />
            </div>
            <div className="stat-number" style={{ position: 'relative', zIndex: 2 }}>{transactions.filter(t => t.orderStatus === 'Pending').length}</div>
            <div className="stat-label" style={{ position: 'relative', zIndex: 2 }}>Pending</div>
          </div>
        </div>

        {/* Business Features */}
        <div className="stats-grid">
          <ShipmentTracker transactions={transactions} onTrackingResult={setTrackingResult} />
          
          <div className="stat-card" style={{ minHeight: '200px' }}>
            <h3 className="flex items-center gap-2 mb-2">
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Recent Transactions
            </h3>
            <div className="transaction-list">
              {transactions.slice(0, 3).map((transaction, index) => (
                <div key={index} className="transaction-item" style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="transaction-info">
                    <div className="transaction-id" style={{ fontSize: '12px', fontWeight: '600' }}>{transaction.transactionId}</div>
                    <div className="transaction-details" style={{ fontSize: '11px', color: '#6b7280' }}>
                      {transaction.location} • ${transaction.orderAmount}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowNotificationPanel(true);
                      }}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '3px 6px',
                        borderRadius: '3px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                      title="Notify Consumer"
                    >
                      🔔
                    </button>
                    <span className={`status-badge ${transaction.orderStatus.toLowerCase()}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                      {transaction.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentTrackingResult && <RealTimeTracker transaction={currentTrackingResult} />}
          <SmartContract transaction={currentTrackingResult} />
          <WalletManager user={user} />
          <BlockchainTransaction user={user} />

          <div className="stat-card" style={{ minHeight: '200px' }}>
            <h3 className="flex items-center gap-2 mb-2">
              <CloudIcon className="w-5 h-5" />
              Environment
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0369a1' }}>
                  {transactions.length > 0 ? (transactions.reduce((sum, t) => sum + t.temperature, 0) / transactions.length).toFixed(1) : 0}°C
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>Avg Temperature</div>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#166534' }}>
                  {transactions.length > 0 ? (transactions.reduce((sum, t) => sum + t.humidity, 0) / transactions.length).toFixed(1) : 0}%
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>Avg Humidity</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        )}
      </main>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .business-stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .business-stat-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .business-stat-card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .business-stat-card:hover:before {
          opacity: 1;
        }
      `}</style>
    </div>
  );



  if (showBlockchainPortal) {
    return (
      <>
        <Toaster position="top-right" />
        <BlockchainPortal 
          user={user} 
          onBack={() => setShowBlockchainPortal(false)} 
        />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div>
      {activeView === 'business' ? (
        <BusinessPortal />
      ) : (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setActiveView('business')}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            🏢 Back to Business
          </button>
          <ConsumerPortal transactions={transactions} />
        </div>
      )}
      </div>
      
      {/* Notification Panel */}
      {showNotificationPanel && (
        <NotificationPanel
          transaction={selectedTransaction}
          onClose={() => {
            setShowNotificationPanel(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </>
  );
};

export default UnifiedPortal;