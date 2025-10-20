import React, { useState } from 'react';
import { PlusIcon, TruckIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

const ShipmentForm = () => {
  const [formData, setFormData] = useState({
    itemId: '',
    supplierId: '',
    customerId: '',
    location: '',
    orderAmount: '',
    quantityShipped: '',
    temperature: '',
    humidity: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createTransaction = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['itemId', 'supplierId', 'customerId', 'location', 'orderAmount', 'quantityShipped'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Generate transaction ID
      const transactionId = `TX${String(Date.now()).slice(-5)}`;
      
      // Create transaction data
      const transactionData = {
        transactionId,
        timestamp: new Date().toISOString(),
        itemId: formData.itemId,
        supplierId: formData.supplierId,
        customerId: formData.customerId,
        location: formData.location,
        temperature: formData.temperature || Math.random() * 20,
        humidity: formData.humidity || Math.random() * 100,
        gpsCoordinates: `(${(Math.random() * 90).toFixed(4)}, ${(Math.random() * 180 - 90).toFixed(4)})`,
        orderAmount: formData.orderAmount,
        quantityShipped: formData.quantityShipped,
        orderStatus: 'Pending',
        paymentStatus: 'Pending',
        timeToDelivery: Math.floor(Math.random() * 10) + 1,
        quantityMismatch: 0,
        fraudIndicator: 0,
        transactionHash: `0x${Math.random().toString(16).substr(2, 4)}`,
        smartContractStatus: 'Active',
        complianceCheck: 1
      };

      // Simulate API call to create transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        itemId: '',
        supplierId: '',
        customerId: '',
        location: '',
        orderAmount: '',
        quantityShipped: '',
        temperature: '',
        humidity: ''
      });
      
      toast.success(`Transaction created successfully! ID: ${transactionId}`);
    } catch (error) {
      toast.error('Failed to create transaction');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card 
      title="Create New Transaction" 
      subtitle="Add a new supply chain transaction"
      icon={PlusIcon}
    >
      <form onSubmit={createTransaction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Item ID *"
            name="itemId"
            value={formData.itemId}
            onChange={handleInputChange}
            placeholder="e.g., 9102"
            required
          />
          
          <Input
            label="Supplier ID *"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleInputChange}
            placeholder="e.g., S4"
            required
          />
          
          <Input
            label="Customer ID *"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            placeholder="e.g., C9"
            required
          />
          
          <Input
            label="Location *"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Chicago"
            required
          />
          
          <Input
            label="Order Amount ($) *"
            name="orderAmount"
            type="number"
            value={formData.orderAmount}
            onChange={handleInputChange}
            placeholder="e.g., 2996"
            required
          />
          
          <Input
            label="Quantity Shipped *"
            name="quantityShipped"
            type="number"
            value={formData.quantityShipped}
            onChange={handleInputChange}
            placeholder="e.g., 153"
            required
          />
          
          <Input
            label="Temperature (°C)"
            name="temperature"
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={handleInputChange}
            placeholder="Optional - auto-generated if empty"
          />
          
          <Input
            label="Humidity (%)"
            name="humidity"
            type="number"
            step="0.1"
            value={formData.humidity}
            onChange={handleInputChange}
            placeholder="Optional - auto-generated if empty"
          />
        </div>
        
        <Button
          type="submit"
          loading={isLoading}
          icon={TruckIcon}
          size="lg"
          className="w-full"
        >
          Create Transaction
        </Button>
      </form>
    </Card>
  );
};

export default ShipmentForm;