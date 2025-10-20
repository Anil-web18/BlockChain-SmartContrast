import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'support', message: 'Hello! How can I help you today?', time: '10:30 AM' }
  ]);

  const handleQuickAction = (actionType) => {
    switch (actionType) {
      case 'track':
        toast.success('📍 Redirecting to Product Journey...');
        // Simulate navigation
        setTimeout(() => {
          toast('Use the scanner to track your products!');
        }, 1500);
        break;
      case 'return':
        toast.success('📦 Opening return request...');
        setTimeout(() => {
          window.open('https://mail.google.com/mail/?view=cm&to=returns@oilgaschain.com&su=Return Request&body=I would like to return my order. Order details:', '_blank');
        }, 1000);
        break;
      case 'issue':
        toast.success('⚠️ Opening issue report...');
        setTimeout(() => {
          window.open('https://mail.google.com/mail/?view=cm&to=support@oilgaschain.com&su=Issue Report&body=I am experiencing an issue with:', '_blank');
        }, 1000);
        break;
      case 'account':
        toast.success('👤 Account help available...');
        setTimeout(() => {
          window.open('https://mail.google.com/mail/?view=cm&to=support@oilgaschain.com&su=Account Help&body=I need help with my account:', '_blank');
        }, 1000);
        break;
      default:
        toast('Action not available');
    }
  };

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order using the Product Journey feature. Simply scan the QR code or enter your order ID in the scanner section.'
    },
    {
      question: 'What is blockchain verification?',
      answer: 'Our blockchain verification ensures product authenticity by creating an immutable record of each product\'s journey from source to delivery.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 5-7 business days, while express delivery takes 2-3 business days.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 2 hours of placement. After that, please contact our support team for assistance.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for business accounts.'
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, newMessage]);
    setChatMessage('');

    // Simulate support response
    setTimeout(() => {
      const responses = [
        'Thank you for your message. Let me help you with that.',
        'I understand your concern. Let me check that for you.',
        'That\'s a great question! Here\'s what I can tell you...',
        'I\'ll be happy to assist you with this issue.'
      ];
      
      const supportResponse = {
        id: chatHistory.length + 2,
        sender: 'support',
        message: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, supportResponse]);
    }, 1000);
  };

  const handleContactMethod = (method) => {
    switch (method) {
      case 'phone':
        toast.success('📞 Calling +1-800-OIL-GAS...');
        window.location.href = 'tel:+18006454271';
        break;
      case 'email':
        toast.success('📧 Opening email client...');
        setTimeout(() => {
          window.open('https://mail.google.com/mail/?view=cm&to=support@oilgaschain.com&su=Customer Support Request&body=Hello, I need assistance with...', '_blank');
        }, 500);
        break;
      case 'whatsapp':
        toast.success('📱 Opening WhatsApp...');
        setTimeout(() => {
          window.open('https://wa.me/1234567890?text=Hello,%20I%20need%20help%20with%20my%20Oil%20%26%20Gas%20Supply%20Chain%20order', '_blank');
        }, 500);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass p-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Customer Support</h2>
        <p className="text-gray-300">We're here to help you 24/7</p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleContactMethod('phone')}
          className="glass p-4 sm:p-6 text-center hover:bg-white/20 transition-all active:bg-white/30"
        >
          <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Call Us</h3>
          <p className="text-gray-300 text-xs sm:text-sm">+1-800-OIL-GAS</p>
          <p className="text-blue-300 text-xs mt-1">Tap to dial</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleContactMethod('email')}
          className="glass p-4 sm:p-6 text-center hover:bg-white/20 transition-all active:bg-white/30"
        >
          <EnvelopeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Email Us</h3>
          <p className="text-gray-300 text-xs sm:text-sm">support@oilgaschain.com</p>
          <p className="text-green-300 text-xs mt-1">Tap to email</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleContactMethod('whatsapp')}
          className="glass p-4 sm:p-6 text-center hover:bg-white/20 transition-all active:bg-white/30 sm:col-span-2 lg:col-span-1"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">WhatsApp</h3>
          <p className="text-gray-300 text-xs sm:text-sm">Chat with us</p>
          <p className="text-purple-300 text-xs mt-1">Tap to chat</p>
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="glass p-2">
        <div className="flex space-x-1">
          {[
            { id: 'chat', label: 'Live Chat', icon: ChatBubbleLeftRightIcon },
            { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'chat' ? (
          <div className="glass p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Support Agent Online</span>
            </div>

            {/* Chat Messages */}
            <div className="bg-white/5 rounded-lg p-4 h-80 overflow-y-auto mb-4 space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-xs ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-600'
                    }`}>
                      <UserCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 text-gray-200'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="btn-modern btn-primary px-4"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="glass p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 rounded-lg p-4"
                >
                  <h4 className="text-white font-medium mb-2 flex items-start gap-2">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-gray-300 text-sm ml-7">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <div className="glass p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { 
              label: 'Track Order', 
              icon: '📍',
              type: 'track'
            },
            { 
              label: 'Return Item', 
              icon: '📦',
              type: 'return'
            },
            { 
              label: 'Report Issue', 
              icon: '⚠️',
              type: 'issue'
            },
            { 
              label: 'Account Help', 
              icon: '👤',
              type: 'account'
            }
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction(item.type)}
              className="p-4 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-white text-sm transition-all flex flex-col items-center gap-2 min-h-[80px] justify-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-center leading-tight font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
          <p className="text-blue-200 text-xs text-center">
            💡 Tip: Quick actions will open your email client or provide instant help
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;