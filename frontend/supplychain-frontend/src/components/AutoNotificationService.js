import React, { useEffect, useState } from 'react';
import { notificationService } from '../utils/notificationService';
import toast from 'react-hot-toast';

const AutoNotificationService = ({ transactions, consumers = [] }) => {
  const [previousTransactions, setPreviousTransactions] = useState([]);
  const [notificationLog, setNotificationLog] = useState([]);

  // Default consumer contacts for demo
  const defaultConsumers = [
    { id: 1, name: 'John Doe', email: 'john.consumer@example.com', phone: '+1234567890' },
    { id: 2, name: 'Jane Smith', email: 'jane.consumer@example.com', phone: '+1234567891' },
    { id: 3, name: 'Mike Johnson', email: 'mike.consumer@example.com', phone: '+1234567892' }
  ];

  const consumerList = consumers.length > 0 ? consumers : defaultConsumers;

  useEffect(() => {
    if (previousTransactions.length === 0) {
      setPreviousTransactions(transactions);
      return;
    }

    // Check for status changes
    transactions.forEach(currentTransaction => {
      const previousTransaction = previousTransactions.find(
        prev => prev.transactionId === currentTransaction.transactionId
      );

      // If status changed, send notification
      if (previousTransaction && 
          previousTransaction.orderStatus !== currentTransaction.orderStatus) {
        
        // Find consumer for this transaction
        const consumer = consumerList[Math.floor(Math.random() * consumerList.length)];
        
        sendStatusChangeNotification(currentTransaction, consumer);
      }
    });

    setPreviousTransactions(transactions);
  }, [transactions]);

  const sendStatusChangeNotification = async (transaction, consumer) => {
    try {
      const results = await notificationService.notifyConsumer(consumer, transaction);
      
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        transactionId: transaction.transactionId,
        status: transaction.orderStatus,
        consumer: consumer.name,
        results: results
      };
      
      setNotificationLog(prev => [logEntry, ...prev.slice(0, 9)]); // Keep last 10
      
      toast.success(`🔔 Consumer ${consumer.name} notified about order ${transaction.transactionId}`);
    } catch (error) {
      console.error('Auto notification failed:', error);
    }
  };

  // Show notification log in a small widget
  if (notificationLog.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 1000,
      maxHeight: '400px',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151'
      }}>
        <span>🔔</span>
        Auto Notifications
      </div>
      
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
        {notificationLog.slice(0, 5).map(log => (
          <div key={log.id} style={{
            padding: '8px',
            marginBottom: '8px',
            background: '#f8fafc',
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              Order: {log.transactionId}
            </div>
            <div style={{ color: '#6b7280', marginBottom: '4px' }}>
              Status: <span style={{ color: '#059669' }}>{log.status}</span>
            </div>
            <div style={{ color: '#6b7280', marginBottom: '4px' }}>
              Sent to: {log.consumer}
            </div>
            <div style={{ fontSize: '10px', color: '#9ca3af' }}>
              {log.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoNotificationService;