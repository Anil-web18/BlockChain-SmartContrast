const twilio = require('twilio');

const sendWhatsAppConfirmation = async (phoneNumber, orderDetails) => {
  if (!process.env.TWILIO_SID || !process.env.TWILIO_TOKEN) {
    throw new Error('Twilio credentials not configured');
  }
  
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  const message = `🎉 Order Confirmed!\n\nOrder ID: ${orderDetails.orderId}\nTotal: $${orderDetails.total}\n\nThank you for your order!`;
  
  return client.messages.create({
    body: message,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${phoneNumber}`
  });
};

module.exports = { sendWhatsAppConfirmation };