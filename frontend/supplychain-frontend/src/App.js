import React, { useState, useEffect } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import { mockShipments, mockAnalytics, mockSuppliers } from './data/mockData';
import { apiService } from './data/apiData';
import { generateSupplyChainCSV, downloadCSV } from './utils/csvGenerator';

import { loadTrustChainData } from './utils/csvLoader';
import RealTimeTracker from './components/RealTimeTracker';
import SmartContract from './components/SmartContract';
import ConsumerPortal from './components/consumer/ConsumerPortal';
import ModernUnifiedPortal from './components/ModernUnifiedPortal';
import Login from './components/auth/Login';
import AnalyticsDashboard from './components/dashboards/AnalyticsDashboard';
import ExecutiveDashboard from './components/dashboards/ExecutiveDashboard';
import OperationalDashboard from './components/dashboards/OperationalDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [newShipmentForm, setNewShipmentForm] = useState({
    itemId: '',
    supplierId: '',
    customerId: '',
    location: '',
    amount: '',
    quantity: ''
  });

  // Check for existing login
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch transactions
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      // Load trust chain dataset
      const csvData = await loadTrustChainData();
      
      if (csvData.length > 0) {
        // Use CSV data
        const parsedTransactions = csvData.map(row => ({
          transactionId: row['Transaction ID'],
          timestamp: row['Timestamp'],
          itemId: row['Item ID'],
          supplierId: row['Supplier ID'],
          customerId: row['Customer ID'],
          location: row['Location'],
          temperature: parseFloat(row['Temperature']) || 20,
          humidity: parseFloat(row['Humidity']) || 50,
          orderAmount: parseInt(row['Order Amount']) || 0,
          quantityShipped: parseInt(row['Quantity Shipped']) || 0,
          orderStatus: row['Order Status'],
          paymentStatus: row['Payment Status'],
          transactionHash: row['Transaction Hash'],
          smartContractStatus: row['Smart Contract Status'],
          gpsCoordinates: row['GPS Coordinates'],
          fraudIndicator: row['Fraud Indicator']
        }));
        setTransactions(parsedTransactions);
      } else {
        // Fallback to mock data
        const parsedTransactions = mockShipments.map(shipment => ({
          transactionId: shipment.trackingId,
          timestamp: shipment.createdAt,
          itemId: shipment.product,
          supplierId: shipment.sender,
          customerId: shipment.receiver,
          location: `${shipment.origin} → ${shipment.destination}`,
          temperature: shipment.temperature || 20,
          humidity: shipment.humidity || 50,
          orderAmount: parseFloat(shipment.value) * 100,
          quantityShipped: shipment.quantity,
          orderStatus: shipment.status,
          paymentStatus: 'Completed',
          transactionHash: `0x${Math.random().toString(16).substr(2, 8)}`,
          smartContractStatus: 'Active'
        }));
        setTransactions(parsedTransactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        role: email.includes('consumer') ? 'consumer' : 'admin'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setTransactions([]);
  };

  // Track transaction
  const trackTransaction = async () => {
    if (!trackingId.trim()) {
      alert('Please enter a transaction ID');
      return;
    }

    const transaction = transactions.find(t => t.transactionId === trackingId);
    if (transaction) {
      setTrackingResult(transaction);
    } else {
      alert('Transaction not found');
      setTrackingResult(null);
    }
  };

  // Modern Login form
  if (!user) {
    return (
      <ErrorBoundary>
        <Login onLogin={(userData) => setUser(userData)} />
      </ErrorBoundary>
    );
  }

  // Calculate stats from actual data
  const stats = {
    total: transactions.length,
    delivered: transactions.filter(t => t.orderStatus === 'Delivered').length,
    shipped: transactions.filter(t => t.orderStatus === 'Shipped').length,
    pending: transactions.filter(t => t.orderStatus === 'Pending').length,
    totalAmount: transactions.reduce((sum, t) => sum + (t.orderAmount || 0), 0)
  };

  // Unified Portal (handles both business and consumer views)
  if (user) {
    return (
      <ErrorBoundary>
        <ModernUnifiedPortal 
          user={user}
          transactions={transactions}
          trackingResult={trackingResult}
          onLogout={handleLogout}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
        />
      </ErrorBoundary>
    );
  }

  // This should never be reached due to UnifiedPortal handling
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <div>Loading...</div>
    </ErrorBoundary>
  );
}

export default App;