const http = require('http');

const data = JSON.stringify({
  phone: '+1234567890',
  orderId: 'TEST123',
  total: 99.99
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/send-whatsapp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  res.on('end', () => {
    console.log('WhatsApp result:', JSON.parse(responseData));
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();