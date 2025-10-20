// API data fetching for supply chain
import axios from 'axios';

// Mock API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Fetch all shipments
  getShipments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shipments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shipments:', error);
      // Return mock data if API fails
      return mockShipmentsAPI;
    }
  },

  // Create new shipment
  createShipment: async (shipmentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shipments`, shipmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  },

  // Update shipment status
  updateShipment: async (id, updateData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/shipments/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating shipment:', error);
      throw error;
    }
  },

  // Get analytics data
  getAnalytics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/analytics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return mockAnalyticsAPI;
    }
  }
};

// Mock API responses
const mockShipmentsAPI = [
  {
    id: 1,
    trackingId: "API001",
    product: "Laptops",
    quantity: 50,
    value: "15.2",
    status: "Delivered",
    origin: "Tokyo, Japan",
    destination: "San Francisco, USA",
    carrier: "DHL",
    createdAt: "2024-01-10T09:00:00Z"
  },
  {
    id: 2,
    trackingId: "API002",
    product: "Pharmaceuticals",
    quantity: 1000,
    value: "8.7",
    status: "In Transit",
    origin: "Basel, Switzerland",
    destination: "Toronto, Canada",
    carrier: "FedEx",
    createdAt: "2024-01-18T14:30:00Z"
  }
];

const mockAnalyticsAPI = {
  totalShipments: 234,
  delivered: 198,
  inTransit: 28,
  created: 8,
  revenue: 1250.5,
  averageDeliveryTime: 7.2
};