const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (customerEmail, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: 'Order Confirmation - Supply Chain',
    html: `
      <h2>Order Confirmed!</h2>
      <p>Thank you for your order.</p>
      <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
      <p><strong>Total:</strong> $${orderDetails.total}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmation };