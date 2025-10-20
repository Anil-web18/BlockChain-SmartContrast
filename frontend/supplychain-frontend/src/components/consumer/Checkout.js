import React, { useState } from 'react';
import { 
  CreditCardIcon, 
  TruckIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Checkout = ({ cartItems, onOrderComplete, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',

    deliveryOption: 'standard'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = formData.deliveryOption === 'express' ? 15.99 : 5.99;
  const finalTotal = totalAmount + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        orderId: `OG-${Date.now()}`,
        items: cartItems,
        customer: formData,
        total: finalTotal,
        deliveryFee,
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + (formData.deliveryOption === 'express' ? 2 : 5) * 24 * 60 * 60 * 1000).toISOString()
      };

      // Send confirmation email (simulated)
      await sendConfirmationEmail(orderData);
      
      // Notify business about new order
      const businessNotification = {
        id: Date.now(),
        orderId: orderData.orderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        total: finalTotal.toFixed(2),
        timestamp: new Date().toISOString()
      };
      
      const existingNotifications = JSON.parse(localStorage.getItem('newOrders') || '[]');
      localStorage.setItem('newOrders', JSON.stringify([...existingNotifications, businessNotification]));
      
      onOrderComplete(orderData);
      toast.success('Order placed successfully! Check your email for confirmation.');
      
    } catch (error) {
      toast.error('Order failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const sendConfirmationEmail = async (orderData) => {
    // Import and use the email service
    const { default: emailService } = await import('../../services/emailService');
    return await emailService.sendOrderConfirmation(orderData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number (for WhatsApp notifications)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <span className="absolute right-3 top-2.5 text-green-500">📱</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">💬 Get order updates via WhatsApp (optional)</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code *"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Options</h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="standard"
                    checked={formData.deliveryOption === 'standard'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Standard Delivery</span>
                      <span className="text-blue-600 font-semibold">$5.99</span>
                    </div>
                    <p className="text-sm text-gray-600">5-7 business days</p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="express"
                    checked={formData.deliveryOption === 'express'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Express Delivery</span>
                      <span className="text-blue-600 font-semibold">$15.99</span>
                    </div>
                    <p className="text-sm text-gray-600">2-3 business days</p>
                  </div>
                </label>
              </div>
            </div>


          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-sm">{item.name} x{item.quantity}</span>
                  <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;