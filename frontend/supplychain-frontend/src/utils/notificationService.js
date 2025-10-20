// Notification service for email and WhatsApp alerts
import toast from 'react-hot-toast';

class NotificationService {
  constructor() {
    this.emailEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';
    this.whatsappEndpoint = 'https://api.whatsapp.com/send';
  }

  // Send email notification
  async sendEmail(to, subject, message, orderDetails) {
    try {
      // Simulate email sending (replace with actual email service)
      const emailData = {
        to_email: to,
        subject: subject,
        message: message,
        order_id: orderDetails.transactionId,
        status: orderDetails.orderStatus,
        location: orderDetails.location,
        timestamp: new Date().toLocaleString()
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Email sent:', emailData);
      toast.success(`📧 Email sent to ${to}`);
      
      return { success: true, data: emailData };
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send email notification');
      return { success: false, error };
    }
  }

  // Send WhatsApp notification
  async sendWhatsApp(phoneNumber, message, orderDetails) {
    try {
      const whatsappMessage = `🚚 *Supply Chain Update*\n\n` +
        `Order ID: ${orderDetails.transactionId}\n` +
        `Status: ${orderDetails.orderStatus}\n` +
        `Location: ${orderDetails.location}\n` +
        `Time: ${new Date().toLocaleString()}\n\n` +
        `${message}\n\n` +
        `Track your order: ${window.location.origin}`;

      // Simulate WhatsApp API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('WhatsApp sent to:', phoneNumber, whatsappMessage);
      toast.success(`📱 WhatsApp sent to ${phoneNumber}`);
      
      return { success: true, phone: phoneNumber, message: whatsappMessage };
    } catch (error) {
      console.error('WhatsApp sending failed:', error);
      toast.error('Failed to send WhatsApp notification');
      return { success: false, error };
    }
  }

  // Send order status update to consumer
  async notifyConsumer(consumerContact, orderDetails) {
    const statusMessages = {
      'Pending': 'Your order has been received and is being processed.',
      'Shipped': 'Great news! Your order has been shipped and is on its way.',
      'In Transit': 'Your order is currently in transit to your location.',
      'Delivered': 'Your order has been successfully delivered. Thank you for choosing us!'
    };

    const message = statusMessages[orderDetails.orderStatus] || 'Your order status has been updated.';
    const subject = `Order Update: ${orderDetails.transactionId} - ${orderDetails.orderStatus}`;

    const notifications = [];

    // Send email if email provided
    if (consumerContact.email) {
      const emailResult = await this.sendEmail(
        consumerContact.email,
        subject,
        message,
        orderDetails
      );
      notifications.push({ type: 'email', ...emailResult });
    }

    // Send WhatsApp if phone provided
    if (consumerContact.phone) {
      const whatsappResult = await this.sendWhatsApp(
        consumerContact.phone,
        message,
        orderDetails
      );
      notifications.push({ type: 'whatsapp', ...whatsappResult });
    }

    return notifications;
  }

  // Bulk notify multiple consumers
  async bulkNotify(consumers, orderDetails) {
    const results = [];
    
    for (const consumer of consumers) {
      const result = await this.notifyConsumer(consumer, orderDetails);
      results.push({ consumer: consumer.id, notifications: result });
    }
    
    return results;
  }
}

export const notificationService = new NotificationService();
export default notificationService;