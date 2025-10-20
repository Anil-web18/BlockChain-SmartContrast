import React, { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  TruckIcon, 
  XCircleIcon,
  EyeIcon 
} from '@heroicons/react/24/outline';

const OrderManagement = () => {
  const [orders] = useState([
    {
      id: 'OG-12345',
      customer: 'John Smith',
      email: 'john@example.com',
      phone: '+1234567890',
      items: [{ name: 'Crude Oil', quantity: 100, price: 75.50 }],
      total: 7550.00,
      status: 'pending',
      date: '2024-01-15',
      address: '123 Main St, New York, NY'
    },
    {
      id: 'OG-12346',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1234567891',
      items: [{ name: 'Natural Gas', quantity: 50, price: 45.00 }],
      total: 2250.00,
      status: 'processing',
      date: '2024-01-14',
      address: '456 Oak Ave, Los Angeles, CA'
    },
    {
      id: 'OG-12347',
      customer: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+1234567892',
      items: [{ name: 'Diesel Fuel', quantity: 200, price: 85.25 }],
      total: 17050.00,
      status: 'shipped',
      date: '2024-01-13',
      address: '789 Pine St, Chicago, IL'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'processing': return <ClockIcon className="w-4 h-4" />;
      case 'shipped': return <TruckIcon className="w-4 h-4" />;
      case 'delivered': return <CheckCircleIcon className="w-4 h-4" />;
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="text-sm text-gray-600">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details - #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.customer}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Order Information</h4>
                <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </p>
                <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Items Ordered</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-2">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;