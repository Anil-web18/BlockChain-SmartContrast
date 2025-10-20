// Mock WhatsApp service for testing without real Twilio credentials
const sendMockWhatsAppConfirmation = async (phoneNumber, orderDetails) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const message = `🎉 Order Confirmed!\n\nOrder ID: ${orderDetails.orderId}\nTotal: $${orderDetails.total}\n\nThank you for your order!`;
  
  console.log('📱 MOCK WHATSAPP MESSAGE SENT:');
  console.log(`To: ${phoneNumber}`);
  console.log(`Message: ${message}`);
  console.log('✅ WhatsApp confirmation sent successfully (MOCK)');
  
  return {
    sid: 'mock_' + Date.now(),
    status: 'sent',
    to: phoneNumber,
    body: message
  };
};

module.exports = { sendMockWhatsAppConfirmation };