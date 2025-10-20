import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, DevicePhoneMobileIcon, BellIcon } from '@heroicons/react/24/outline';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import { notificationService } from '../utils/notificationService';
import toast from 'react-hot-toast';

const NotificationPanel = ({ transaction, onClose }) => {
  const [consumerContact, setConsumerContact] = useState({
    email: 'consumer@example.com',
    phone: '+1234567890',
    name: 'John Doe'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState([]);

  const handleInputChange = (e) => {
    setConsumerContact({
      ...consumerContact,
      [e.target.name]: e.target.value
    });
  };

  const sendNotifications = async () => {
    if (!transaction) {
      toast.error('No transaction selected');
      return;
    }

    setIsLoading(true);
    try {
      const results = await notificationService.notifyConsumer(consumerContact, transaction);
      
      const newNotification = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        orderId: transaction.transactionId,
        status: transaction.orderStatus,
        contact: consumerContact,
        results: results
      };
      
      setNotificationHistory(prev => [newNotification, ...prev]);
      toast.success('Notifications sent successfully!');
    } catch (error) {
      toast.error('Failed to send notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#f59e0b',
      'Shipped': '#3b82f6',
      'In Transit': '#8b5cf6',
      'Delivered': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BellIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Consumer Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {transaction && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Order Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Order ID:</span>
                  <div className="font-mono">{transaction.transactionId}</div>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <div 
                    className="font-semibold"
                    style={{ color: getStatusColor(transaction.orderStatus) }}
                  >
                    {transaction.orderStatus}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <div>{transaction.location}</div>
                </div>
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <div>${transaction.orderAmount}</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5" />
              Consumer Contact Information
            </h3>
            
            <Input
              label="Consumer Name"
              name="name"
              value={consumerContact.name}
              onChange={handleInputChange}
              placeholder="Enter consumer name"
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={consumerContact.email}
              onChange={handleInputChange}
              placeholder="consumer@example.com"
            />
            
            <Input
              label="Phone Number"
              name="phone"
              value={consumerContact.phone}
              onChange={handleInputChange}
              placeholder="+1234567890"
            />
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              onClick={sendNotifications}
              loading={isLoading}
              className="flex-1"
              disabled={!transaction}
            >
              <div className="flex items-center gap-2">
                <BellIcon className="w-4 h-4" />
                Send Notifications
              </div>
            </Button>
          </div>

          {notificationHistory.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Notification History</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {notificationHistory.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Order: {notification.orderId}</div>
                      <div className="text-sm text-gray-500">{notification.timestamp}</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(notification.status) }}
                      >
                        {notification.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Sent to: {notification.contact.name} ({notification.contact.email})
                    </div>
                    <div className="flex gap-2 mt-2">
                      {notification.results.map((result, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded text-xs ${
                            result.success 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {result.type === 'email' ? '📧' : '📱'} {result.success ? 'Sent' : 'Failed'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default NotificationPanel;