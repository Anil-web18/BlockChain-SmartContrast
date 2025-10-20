import React, { useState, useEffect } from 'react';
import { 
  BoltIcon, 
  CreditCardIcon, 
  LockOpenIcon, 
  MapPinIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const SmartContract = ({ transaction }) => {
  const [paymentStatus, setPaymentStatus] = useState('ready');
  const [contractBalance, setContractBalance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Auto-execute payment when transaction is tracked
  useEffect(() => {
    if (transaction && autoPayEnabled && paymentStatus === 'ready') {
      executePayment();
    }
  }, [transaction]);

  const executePayment = async () => {
    setIsProcessing(true);
    addNotification('🔄 Initiating smart contract payment...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const amount = transaction?.orderAmount || 1000;
      setContractBalance(prev => prev + amount);
      setPaymentStatus('escrowed');
      
      addNotification(`✅ Payment of $${amount} secured in escrow`);
      
      // Auto-release after delivery confirmation
      setTimeout(() => {
        if (transaction?.orderStatus === 'Delivered') {
          releaseEscrow();
        }
      }, 2000);
      
    } catch (error) {
      addNotification('❌ Payment execution failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const releaseEscrow = async () => {
    if (contractBalance === 0) return;
    
    setIsProcessing(true);
    addNotification('🔓 Releasing escrow to supplier...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const amount = contractBalance;
      setContractBalance(0);
      setPaymentStatus('completed');
      
      addNotification(`💰 $${amount} transferred to supplier wallet`);
    } catch (error) {
      addNotification('❌ Escrow release failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, time: new Date().toLocaleTimeString() }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const getStatusColor = () => {
    switch(paymentStatus) {
      case 'ready': return '#3b82f6';
      case 'escrowed': return '#f59e0b';
      case 'completed': return '#22c55e';
      default: return '#6b7280';
    }
  };

  return (
    <div className="stat-card" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
        <div style={{width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px'}}>
          <BoltIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 style={{margin: 0, fontSize: '16px', fontWeight: 'bold'}}>Smart Contract</h3>
          <p style={{margin: 0, fontSize: '12px', opacity: 0.8}}>Automated Payment System</p>
        </div>
      </div>
      
      {/* Live Status Dashboard */}
      <div style={{background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px', marginBottom: '12px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
          <div>
            <div style={{fontSize: '24px', fontWeight: 'bold'}}>${contractBalance}</div>
            <div style={{fontSize: '12px', opacity: 0.8}}>Escrow Balance</div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{display: 'inline-flex', alignItems: 'center', background: getStatusColor(), padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'}}>
              <div style={{width: '8px', height: '8px', background: 'white', borderRadius: '50%', marginRight: '6px', animation: paymentStatus === 'escrowed' ? 'pulse 2s infinite' : 'none'}}></div>
              {paymentStatus.toUpperCase()}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{background: 'rgba(255,255,255,0.2)', height: '4px', borderRadius: '2px', overflow: 'hidden'}}>
          <div style={{
            background: 'white',
            height: '100%',
            width: paymentStatus === 'ready' ? '0%' : paymentStatus === 'escrowed' ? '60%' : '100%',
            transition: 'width 0.5s ease'
          }}></div>
        </div>
      </div>

      {/* Auto-Pay Toggle */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
        <span style={{fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px'}}>
          <BoltIcon className="w-4 h-4" /> Auto-Execute Payments
        </span>
        <label style={{position: 'relative', display: 'inline-block', width: '44px', height: '24px'}}>
          <input 
            type="checkbox" 
            checked={autoPayEnabled} 
            onChange={(e) => setAutoPayEnabled(e.target.checked)}
            style={{opacity: 0, width: 0, height: 0}}
          />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: autoPayEnabled ? '#22c55e' : '#6b7280',
            transition: '0.3s',
            borderRadius: '24px'
          }}>
            <span style={{
              position: 'absolute',
              content: '',
              height: '18px',
              width: '18px',
              left: autoPayEnabled ? '23px' : '3px',
              bottom: '3px',
              background: 'white',
              transition: '0.3s',
              borderRadius: '50%'
            }}></span>
          </span>
        </label>
      </div>

      {/* Quick Actions */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px'}}>
        <button
          onClick={executePayment}
          disabled={isProcessing || paymentStatus !== 'ready'}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <CreditCardIcon className="w-3 h-3" /> Pay Now
          </span>
        </button>
        
        <button
          onClick={releaseEscrow}
          disabled={isProcessing || contractBalance === 0}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <LockOpenIcon className="w-3 h-3" /> Release
          </span>
        </button>
      </div>

      {/* Live Notifications */}
      {notifications.length > 0 && (
        <div style={{marginBottom: '16px'}}>
          {notifications.slice(-2).map(notif => (
            <div key={notif.id} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '4px',
              animation: 'slideIn 0.3s ease'
            }}>
              <div>{notif.message}</div>
              <div style={{opacity: 0.6, fontSize: '10px'}}>{notif.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* Contract Info */}
      <div style={{fontSize: '11px', opacity: 0.7, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '12px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <MapPinIcon className="w-3 h-3" /> 0x742d...3b8D
          </div>
          <div>⛽ 0.002 ETH</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <GlobeAltIcon className="w-3 h-3" /> Ethereum
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <BoltIcon className="w-3 h-3" /> Instant
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SmartContract;