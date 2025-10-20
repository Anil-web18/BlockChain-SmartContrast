// CSV data parser for supply chain
export const parseCSVData = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim();
    });
    return obj;
  });
};

// Sample CSV structure for supply chain data
export const csvTemplate = `trackingId,product,quantity,value,status,origin,destination,carrier,createdAt
SC001,Electronics,100,2.5,Delivered,Shanghai,New York,DHL,2024-01-15
SC002,Medical Supplies,500,5.0,In Transit,Mumbai,London,FedEx,2024-01-20
SC003,Food Products,200,1.8,Created,São Paulo,Berlin,UPS,2024-01-22`;

// Function to generate CSV from data
export const generateCSV = (data) => {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  return csvContent;
};