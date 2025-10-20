// Mock dataset for supply chain
export const mockShipments = [
  {
    id: 1,
    trackingId: "SC001",
    sender: "0x1234...5678",
    receiver: "0x8765...4321",
    product: "Electronics - Smartphones",
    quantity: 100,
    value: "2.5",
    status: "Delivered",
    origin: "Shanghai, China",
    destination: "New York, USA",
    createdAt: "2024-01-15T10:30:00Z",
    deliveredAt: "2024-01-25T14:20:00Z",
    carrier: "DHL Express",
    temperature: 22,
    humidity: 45
  },
  {
    id: 2,
    trackingId: "SC002",
    sender: "0x2345...6789",
    receiver: "0x9876...5432",
    product: "Medical Supplies - Vaccines",
    quantity: 500,
    value: "5.0",
    status: "In Transit",
    origin: "Mumbai, India",
    destination: "London, UK",
    createdAt: "2024-01-20T08:15:00Z",
    estimatedDelivery: "2024-01-28T16:00:00Z",
    carrier: "FedEx",
    temperature: -20,
    humidity: 30
  },
  {
    id: 3,
    trackingId: "SC003",
    sender: "0x3456...7890",
    receiver: "0x0987...6543",
    product: "Food Products - Organic Coffee",
    quantity: 200,
    value: "1.8",
    status: "Created",
    origin: "São Paulo, Brazil",
    destination: "Berlin, Germany",
    createdAt: "2024-01-22T12:45:00Z",
    estimatedDelivery: "2024-02-05T10:00:00Z",
    carrier: "UPS",
    temperature: 18,
    humidity: 60
  }
];

export const mockAnalytics = {
  totalShipments: 156,
  delivered: 142,
  inTransit: 12,
  created: 2,
  cancelled: 0,
  averageDeliveryTime: 8.5,
  onTimeDeliveryRate: 94.2,
  monthlyData: [
    { month: 'Jan', shipments: 45, delivered: 42, revenue: 125.5 },
    { month: 'Feb', shipments: 38, delivered: 36, revenue: 98.2 },
    { month: 'Mar', shipments: 52, delivered: 48, revenue: 156.8 },
    { month: 'Apr', shipments: 41, delivered: 39, revenue: 112.3 },
    { month: 'May', shipments: 47, delivered: 44, revenue: 134.7 },
    { month: 'Jun', shipments: 33, delivered: 31, revenue: 89.4 }
  ]
};

export const mockSuppliers = [
  { id: 1, name: "TechCorp Ltd", location: "Shanghai", rating: 4.8, shipments: 45 },
  { id: 2, name: "MedSupply Inc", location: "Mumbai", rating: 4.9, shipments: 32 },
  { id: 3, name: "FoodTrade Co", location: "São Paulo", rating: 4.6, shipments: 28 }
];