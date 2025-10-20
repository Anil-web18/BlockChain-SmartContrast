import React, { useState } from 'react';
import { BellIcon, EyeIcon } from '@heroicons/react/24/outline';

const SimpleBusinessDashboard = () => {
  const [orders] = useState([
    {
      id: 'OG-12345',
      customer: 'John Smith',
      email: 'john@example.com',
      total: 7550.00,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'OG-12346', 
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      total: 2250.00,
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: 'OG-12347',
      customer: 'Mike Wilson', 
      email: 'mike@example.com',
      total: 17050.00,
      status: 'shipped',
      date: '2024-01-13'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Business Dashboard</h1>
          <div className="flex items-center gap-2">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-600">$26,850</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold text-green-600">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-2xl font-bold text-orange-600">1</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Customer Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">#{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-600">{order.email}</td>
                  <td className="px-4 py-3 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <strong>Order ID:</strong> #{selectedOrder.id}
              </div>
              <div>
                <strong>Customer:</strong> {selectedOrder.customer}
              </div>
              <div>
                <strong>Email:</strong> {selectedOrder.email}
              </div>
              <div>
                <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
              </div>
              <div>
                <strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  selectedOrder.status === 'shipped' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedOrder.status.toUpperCase()}
                </span>
              </div>
              <div>
                <strong>Date:</strong> {selectedOrder.date}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleBusinessDashboard;