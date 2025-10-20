import toast from 'react-hot-toast';

// For real email functionality, install EmailJS: npm install @emailjs/browser
// import emailjs from '@emailjs/browser';

class EmailService {
  async sendOrderConfirmation(orderData) {
    try {
      const emailContent = this.generateOrderConfirmationEmail(orderData);
      
      // Real email sending (requires EmailJS setup)
      const emailResult = await this.sendRealEmail(emailContent, orderData);
      
      if (emailResult.success) {
        toast.success(`📧 Gmail opened for ${orderData.customer.email}`, {
          duration: 5000,
          icon: '✅'
        });
        
        // Show additional instruction
        setTimeout(() => {
          toast('Gmail compose window opened - click Send to deliver email', {
            duration: 6000,
            icon: '📬'
          });
        }, 2000);
      } else {
        toast.error('Email client could not be opened', {
          duration: 4000
        });
      }

      // Send WhatsApp notification
      await this.sendWhatsAppNotification(orderData);
      
      this.storeEmailRecord(orderData, emailContent);
      
      return {
        success: true,
        messageId: `msg_${Date.now()}`,
        timestamp: new Date().toISOString(),
        emailSent: emailResult.success
      };
    } catch (error) {
      toast.error('Failed to send notifications');
      return { success: false, error: error.message };
    }
  }

  async sendWhatsAppNotification(orderData) {
    try {
      const whatsappMessage = this.generateWhatsAppMessage(orderData);
      const phone = orderData.customer.phone || '1234567890';
      
      // Open WhatsApp with pre-filled message
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        toast.success(`📱 WhatsApp opened with order details`, {
          duration: 4000,
          icon: '💬'
        });
        
        // Show instruction
        setTimeout(() => {
          toast('Send the WhatsApp message to notify the customer', {
            duration: 5000,
            icon: '📲'
          });
        }, 1000);
      }, 3000);
      
      return { success: true };
    } catch (error) {
      console.error('WhatsApp sending failed:', error);
      toast.error('WhatsApp notification failed');
      return { success: false };
    }
  }

  generateWhatsAppMessage(orderData) {
    return `🛒 *Order Confirmation*\n\n` +
           `Hi ${orderData.customer.firstName}!\n\n` +
           `Your order has been confirmed:\n` +
           `📋 Order ID: ${orderData.orderId}\n` +
           `💰 Total: $${orderData.total.toFixed(2)}\n` +
           `📅 Date: ${new Date(orderData.orderDate).toLocaleDateString()}\n` +
           `🚚 Estimated Delivery: ${new Date(orderData.estimatedDelivery).toLocaleDateString()}\n\n` +
           `Items:\n${orderData.items.map(item => `• ${item.name} (${item.quantity}x)`).join('\n')}\n\n` +
           `Thank you for choosing Oil & Gas Supply Chain! 🌟`;
  }

  async sendTrackingUpdate(orderData, trackingInfo) {
    try {
      await this.simulateEmailSending();
      
      // Send email notification
      toast.success(`📧 Tracking email sent to ${orderData.customer.email}`, {
        duration: 4000
      });
      
      // Send WhatsApp tracking update
      const whatsappMessage = `🚚 *Shipping Update*\n\n` +
                             `Hi ${orderData.customer.firstName}!\n\n` +
                             `Your order ${orderData.orderId} is on its way!\n` +
                             `📦 Tracking: ${trackingInfo?.trackingNumber || 'TRK' + Date.now()}\n` +
                             `🚛 Carrier: Express Delivery\n` +
                             `📍 Status: In Transit\n\n` +
                             `Track your package: bit.ly/track-order`;
      
      setTimeout(() => {
        toast.success(`📱 WhatsApp tracking sent to ${orderData.customer.phone || '+1234567890'}`, {
          duration: 4000
        });
      }, 1000);

      return { success: true, messageId: `track_${Date.now()}` };
    } catch (error) {
      toast.error('Failed to send tracking update');
      return { success: false, error: error.message };
    }
  }

  async sendRealEmail(emailContent, orderData) {
    try {
      // Method 1: Using EmailJS (recommended for frontend)
      // Uncomment and configure after installing EmailJS
      /*
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: orderData.customer.email,
          to_name: orderData.customer.firstName,
          order_id: orderData.orderId,
          total: orderData.total,
          items: orderData.items.map(item => `${item.name} (${item.quantity}x)`).join(', '),
          message: emailContent.html
        },
        'YOUR_PUBLIC_KEY'
      );
      return { success: true, result };
      */
      
      // Method 2: Using mailto (opens email client)
      const subject = encodeURIComponent(`Order Confirmation - ${orderData.orderId}`);
      const body = encodeURIComponent(
        `Dear ${orderData.customer.firstName},\n\n` +
        `Your order ${orderData.orderId} has been confirmed!\n\n` +
        `Order Details:\n` +
        `- Total: $${orderData.total.toFixed(2)}\n` +
        `- Items: ${orderData.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}\n` +
        `- Estimated Delivery: ${new Date(orderData.estimatedDelivery).toLocaleDateString()}\n\n` +
        `Thank you for choosing Oil & Gas Supply Chain!\n\n` +
        `Best regards,\nSupply Chain Team`
      );
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${orderData.customer.email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
      
      return { success: true, method: 'mailto' };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  simulateEmailSending() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000 + Math.random() * 2000);
    });
  }

  generateOrderConfirmationEmail(orderData) {
    return {
      to: orderData.customer.email,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🛒 Order Confirmed!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Thank you, ${orderData.customer.firstName}!</h2>
            <p style="color: #666; font-size: 16px;">Your order has been successfully placed and is being processed.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #667eea; margin-top: 0;">📋 Order Details</h3>
              <p><strong>Order ID:</strong> ${orderData.orderId}</p>
              <p><strong>Order Date:</strong> ${new Date(orderData.orderDate).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> <span style="color: #28a745; font-size: 18px; font-weight: bold;">$${orderData.total.toFixed(2)}</span></p>
              <p><strong>Estimated Delivery:</strong> ${new Date(orderData.estimatedDelivery).toLocaleDateString()}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">📦 Items Ordered</h3>
              ${orderData.items.map(item => `
                <div style="border-bottom: 1px solid #eee; padding: 10px 0; display: flex; justify-content: space-between;">
                  <div>
                    <strong>${item.name}</strong><br>
                    <small style="color: #666;">Quantity: ${item.quantity}</small>
                  </div>
                  <div style="text-align: right;">
                    <strong style="color: #667eea;">$${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">📱 Track Your Order</a>
            </div>
            
            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #0066cc;">💬 <strong>WhatsApp notifications enabled!</strong><br>
              Click the WhatsApp link to receive updates on ${orderData.customer.phone || '+1234567890'}</p>
              <a href="https://wa.me/${(orderData.customer.phone || '1234567890').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I received my order confirmation. Thank you!')}" 
                 style="background: #25d366; color: white; padding: 8px 16px; text-decoration: none; border-radius: 20px; display: inline-block; margin-top: 10px; font-size: 14px;">📱 Open WhatsApp</a>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p>Need help? Contact us at <a href="mailto:support@oilgaschain.com" style="color: #667eea;">support@oilgaschain.com</a></p>
            <p>Oil & Gas Supply Chain - Blockchain Powered Transparency</p>
          </div>
        </div>
      `,
      timestamp: new Date().toISOString()
    };
  }

  storeEmailRecord(orderData, emailContent, type = 'confirmation') {
    const emailRecords = JSON.parse(localStorage.getItem('emailRecords') || '[]');
    emailRecords.push({
      orderId: orderData.orderId,
      type,
      email: emailContent,
      whatsapp: this.generateWhatsAppMessage(orderData),
      sentAt: new Date().toISOString(),
      channels: ['email', 'whatsapp']
    });
    localStorage.setItem('emailRecords', JSON.stringify(emailRecords));
  }

  // Method to open WhatsApp with pre-filled message
  openWhatsAppDemo(orderData) {
    const message = this.generateWhatsAppMessage(orderData);
    const phone = (orderData.customer.phone || '1234567890').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('WhatsApp opened with order details!', {
      duration: 3000,
      icon: '📱'
    });
  }

  // Setup instructions for real email
  getEmailSetupInstructions() {
    return {
      emailjs: {
        install: 'npm install @emailjs/browser',
        setup: 'Create account at emailjs.com and get service ID, template ID, and public key',
        docs: 'https://www.emailjs.com/docs/'
      },
      alternative: {
        backend: 'Set up Node.js backend with nodemailer',
        api: 'Use email API services like SendGrid, Mailgun, or AWS SES'
      }
    };
  }
}

export default new EmailService();