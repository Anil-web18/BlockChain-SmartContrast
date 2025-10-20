import React, { useState } from 'react';
import { BellIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      orderId: 'OG-12345',
      customerName: 'John Smith',
      total: '299.99'
    },
    {
      id: 2,
      orderId: 'OG-12346',
      customerName: 'Sarah Johnson',
      total: '450.00'
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const markAsRead = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addTestNotification = () => {
    const testOrder = {
      id: Date.now(),
      orderId: `TEST-${Math.floor(Math.random() * 1000)}`,
      customerName: 'Test Customer',
      total: (Math.random() * 500 + 100).toFixed(2)
    };
    setNotifications(prev => [testOrder, ...prev]);
    alert(`🔔 New Order Alert!\nOrder #${testOrder.orderId}\nCustomer: ${testOrder.customerName}\nTotal: $${testOrder.total}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white rounded-lg shadow"
      >
        <BellIcon className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-50">
          <div className="p-4 border-b bg-blue-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Order Notifications</h3>
            <button
              onClick={addTestNotification}
              className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-colors"
            >
              + Add Test
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No new orders</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-blue-50 flex items-start gap-3 transition-colors"
                >
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">New Order #{notification.orderId}</p>
                    <p className="text-sm text-gray-600 mt-1">👤 {notification.customerName}</p>
                    <p className="text-sm text-green-600 font-medium mt-1">💰 ${notification.total}</p>
                  </div>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Mark as read"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-3 bg-gray-50 text-center">
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderNotifications;