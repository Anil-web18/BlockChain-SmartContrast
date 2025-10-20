// CSV Generator for Supply Chain Data
export const generateSupplyChainCSV = (count = 100) => {
  const products = [
    'Electronics - Smartphones', 'Medical Supplies', 'Food Products', 
    'Automotive Parts', 'Textiles', 'Pharmaceuticals', 'Chemicals',
    'Electronics - Laptops', 'Medical Equipment', 'Machinery'
  ];

  const origins = [
    'Shanghai China', 'Mumbai India', 'São Paulo Brazil', 'Detroit USA',
    'Dhaka Bangladesh', 'Basel Switzerland', 'Shenzhen China', 'Kerala India',
    'Munich Germany', 'Houston USA', 'Tokyo Japan', 'Seoul South Korea'
  ];

  const destinations = [
    'New York USA', 'London UK', 'Berlin Germany', 'Paris France',
    'Toronto Canada', 'Sydney Australia', 'Rotterdam Netherlands',
    'Dubai UAE', 'Singapore', 'Hong Kong', 'Los Angeles USA'
  ];

  const carriers = ['DHL Express', 'FedEx', 'UPS', 'Maersk', 'COSCO'];
  const statuses = ['Created', 'In Transit', 'Delivered', 'Cancelled'];

  const data = [];
  
  // Header
  data.push([
    'trackingId', 'product', 'quantity', 'value', 'status', 
    'origin', 'destination', 'carrier', 'createdAt', 
    'temperature', 'humidity', 'weight', 'priority'
  ]);

  // Generate data rows
  for (let i = 1; i <= count; i++) {
    const trackingId = `SC${String(i).padStart(3, '0')}`;
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 500) + 10;
    const value = (Math.random() * 20 + 0.5).toFixed(2);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const origin = origins[Math.floor(Math.random() * origins.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    
    // Random date in last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const createdAt = date.toISOString().split('T')[0];
    
    const temperature = (Math.random() * 50 - 10).toFixed(1); // -10 to 40°C
    const humidity = (Math.random() * 60 + 20).toFixed(1); // 20-80%
    const weight = (Math.random() * 1000 + 10).toFixed(2); // kg
    const priority = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];

    data.push([
      trackingId, product, quantity, value, status,
      origin, destination, carrier, createdAt,
      temperature, humidity, weight, priority
    ]);
  }

  return data.map(row => row.join(',')).join('\n');
};

// Download CSV function
export const downloadCSV = (csvContent, filename = 'supply_chain_data.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Parse CSV content
export const parseCSV = (csvContent) => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
};