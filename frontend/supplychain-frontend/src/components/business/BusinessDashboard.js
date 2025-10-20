import React from 'react';
import OrderNotifications from './OrderNotifications';
import OrderManagement from './OrderManagement';
import { ChartBarIcon, CubeIcon, UsersIcon } from '@heroicons/react/24/outline';

const BusinessDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Business Dashboard</h1>
            <OrderNotifications />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">$45,230</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CubeIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Orders Today</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <UsersIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <OrderManagement />
      </div>
    </div>
  );
};

export default BusinessDashboard;