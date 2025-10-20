import React, { useEffect, useState } from 'react';
import { 
  CheckCircleIcon, 
  EnvelopeIcon,
  TruckIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import emailService from '../../services/emailService';

const OrderConfirmation = ({ orderData, onContinueShopping }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(true);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      try {
        const result = await emailService.sendOrderConfirmation(orderData);
        setEmailSent(result.success);
      } catch (error) {
        console.error('Failed to send email:', error);
        setEmailSent(false);
      } finally {
        setEmailSending(false);
      }
    };

    if (orderData) {
      sendConfirmationEmail();
    }
  }, [orderData]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{orderData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{formatDate(orderData.orderDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium text-blue-600">${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery to:</span>
                <span className="font-medium">{orderData.customer.firstName} {orderData.customer.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium">{orderData.customer.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium text-green-600">{formatDate(orderData.estimatedDelivery)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-3">
          {orderData.items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">${item.price} {item.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Confirmation */}
      <div className={`border rounded-lg p-4 mb-6 ${
        emailSending ? 'bg-yellow-50 border-yellow-200' :
        emailSent ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-start gap-3">
          <EnvelopeIcon className={`w-5 h-5 mt-0.5 ${
            emailSending ? 'text-yellow-600' :
            emailSent ? 'text-green-600' : 'text-red-600'
          }`} />
          <div>
            <h4 className={`font-medium ${
              emailSending ? 'text-yellow-900' :
              emailSent ? 'text-green-900' : 'text-red-900'
            }`}>
              {emailSending ? 'Sending Confirmation Email...' :
               emailSent ? 'Confirmation Email Sent' : 'Email Delivery Failed'}
            </h4>
            <p className={`text-sm mt-1 ${
              emailSending ? 'text-yellow-700' :
              emailSent ? 'text-green-700' : 'text-red-700'
            }`}>
              {emailSending ? `Preparing confirmation email for ${orderData.customer.email}...` :
               emailSent ? `A confirmation email has been sent to ${orderData.customer.email} with your order details and tracking information.` :
               `Failed to send confirmation email to ${orderData.customer.email}. Please contact support if needed.`}
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <DocumentTextIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900 mb-1">Order Processing</h4>
          <p className="text-sm text-gray-600">Your order is being prepared for shipment</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <TruckIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900 mb-1">Shipping</h4>
          <p className="text-sm text-gray-600">You'll receive tracking info via email</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <CalendarIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900 mb-1">Delivery</h4>
          <p className="text-sm text-gray-600">Expected by {formatDate(orderData.estimatedDelivery)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onContinueShopping}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => emailService.openWhatsAppDemo(orderData)}
          className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          📱 Share on WhatsApp
        </button>
        <button
          onClick={() => window.print()}
          className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Print Order
        </button>
      </div>

      {/* Support Info */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Need help? Contact our support team at <a href="mailto:support@oilgaschain.com" className="text-blue-600 hover:underline">support@oilgaschain.com</a></p>
      </div>
    </div>
  );
};

export default OrderConfirmation;