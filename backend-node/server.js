const express = require('express');
const cors = require('cors');
const { getS3Data } = require('./s3Service');
const { getLocalData } = require('./localData');
const { sendOrderConfirmation } = require('./emailService');
const { sendWhatsAppConfirmation } = require('./whatsappService');
const { sendMockWhatsAppConfirmation } = require('./mockWhatsappService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database: Using CSV file for data storage

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Supply Chain Backend API', status: 'running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/s3-data', async (req, res) => {
  try {
    const bucketName = 'your-bucket-name';
    const fileKey = 'dataset/oil_supply.csv';
    const data = await getS3Data(bucketName, fileKey);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/dataset', (req, res) => {
  try {
    const data = getLocalData('trust_chain_dataset.csv');
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/send-confirmation', async (req, res) => {
  try {
    const { email, orderId, total } = req.body;
    await sendOrderConfirmation(email, { orderId, total });
    res.json({ success: true, message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, orderId, total } = req.body;
    
    if (!phone || !orderId || !total) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    console.log('Sending WhatsApp to:', phone);
    
    // Use mock service if Twilio credentials not configured
    const useMock = !process.env.TWILIO_SID || process.env.TWILIO_SID.includes('AC1234567890');
    
    const result = useMock 
      ? await sendMockWhatsAppConfirmation(phone, { orderId, total })
      : await sendWhatsAppConfirmation(phone, { orderId, total });
    
    console.log('WhatsApp sent successfully:', result.sid);
    
    res.json({ 
      success: true, 
      message: useMock ? 'Mock WhatsApp sent' : 'WhatsApp sent', 
      sid: result.sid,
      mock: useMock
    });
  } catch (error) {
    console.error('WhatsApp error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});