import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Shipment Delivered',
      message: 'Order #SC-2024-001 has been successfully delivered to destination.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Temperature Alert',
      message: 'Shipment #SC-2024-002 temperature exceeded threshold (25°C).',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Blockchain Verification',
      message: 'Smart contract executed successfully for transaction #TX-789.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    }
  ]);
  const [showPanel, setShowPanel] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircleIcon;
      case 'warning': return ExclamationTriangleIcon;
      case 'info': return InformationCircleIcon;
      default: return InformationCircleIcon;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: ['success', 'warning', 'info'][Math.floor(Math.random() * 3)],
          title: ['New Shipment', 'Status Update', 'System Alert'][Math.floor(Math.random() * 3)],
          message: 'Real-time update from blockchain network.',
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        toast.success('New notification received!');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
      >
        <BellIcon className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs font-bold text-white">{unreadCount}</span>
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-12 w-80 glass rounded-2xl p-4 shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <button
                onClick={() => setShowPanel(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <BellIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${
                        !notification.read ? 'border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getColor(notification.type)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="p-1 rounded hover:bg-white/10 transition-colors"
                            >
                              <XMarkIcon className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <button
                  onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                  className="w-full text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;