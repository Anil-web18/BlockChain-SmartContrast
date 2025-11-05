import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [chatMessage, setChatMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const chatEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1, 
      sender: 'support', 
      message: 'Hello! I\'m here to help you with your supply chain needs. How can I assist you today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '🤖'
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleQuickAction = (actionType) => {
    const actions = {
      track: {
        message: '📍 Tracking system activated',
        action: () => toast('Scan QR code or enter Order ID to track your shipment')
      },
      return: {
        message: '📦 Return process initiated',
        action: () => window.open('mailto:returns@supplychain.com?subject=Return Request&body=Order ID:%0D%0AReason for return:%0D%0A', '_blank')
      },
      issue: {
        message: '⚠️ Issue report opened',
        action: () => window.open('mailto:support@supplychain.com?subject=Technical Issue&body=Describe your issue:%0D%0A', '_blank')
      },
      account: {
        message: '👤 Account assistance ready',
        action: () => toast('Account help: Check FAQ or contact support directly')
      }
    };

    const selectedAction = actions[actionType];
    if (selectedAction) {
      toast.success(selectedAction.message);
      setTimeout(selectedAction.action, 800);
    }
  };

  const faqs = [
    {
      category: 'Orders & Tracking',
      items: [
        {
          question: 'How do I track my shipment?',
          answer: 'Use our blockchain-powered tracking system. Scan the QR code on your receipt or enter your Order ID in the Product Journey section. You\'ll see real-time location, temperature, and custody data.'
        },
        {
          question: 'Why is my order delayed?',
          answer: 'Delays can occur due to weather, customs, or supply chain disruptions. Check your tracking for real-time updates and estimated delivery times.'
        }
      ]
    },
    {
      category: 'Blockchain & Security',
      items: [
        {
          question: 'What is blockchain verification?',
          answer: 'Our blockchain creates an immutable record of your product\'s journey. Every transaction, location change, and quality check is permanently recorded and cannot be altered.'
        },
        {
          question: 'How secure is my data?',
          answer: 'We use enterprise-grade encryption and blockchain technology. Your personal data is protected, and supply chain data is transparent but anonymized.'
        }
      ]
    },
    {
      category: 'Payments & Returns',
      items: [
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept major credit cards, bank transfers, cryptocurrency payments, and corporate accounts with NET-30 terms.'
        },
        {
          question: 'How do I return a product?',
          answer: 'Contact us within 30 days. For oil & gas products, special handling procedures apply. We\'ll provide return shipping labels and instructions.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '👤'
    };

    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');
    setIsTyping(true);

    // Simulate realistic support response
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'I understand your concern. Let me check our system for you.',
        'Thank you for reaching out. I\'ll help you resolve this issue.',
        'Great question! Here\'s what I can tell you about that.',
        'I\'m looking into this right now. Please give me a moment.',
        'I see what you mean. Let me provide you with the best solution.'
      ];
      
      const supportResponse = {
        id: Date.now() + 1,
        sender: 'support',
        message: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '🤖'
      };

      setChatHistory(prev => [...prev, supportResponse]);
    }, 2000);
  };

  const contactMethods = [
    {
      id: 'phone',
      title: 'Call Us',
      subtitle: '24/7 Support Hotline',
      contact: '+1-800-SUPPLY',
      icon: PhoneIcon,
      color: 'blue',
      action: () => {
        toast.success('📞 Connecting to support...');
        window.location.href = 'tel:+18007877759';
      }
    },
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'Response within 2 hours',
      contact: 'support@supplychain.com',
      icon: EnvelopeIcon,
      color: 'green',
      action: () => {
        toast.success('📧 Opening email...');
        window.open('mailto:support@supplychain.com?subject=Support Request&body=Hello,%0D%0A%0D%0APlease describe your issue:%0D%0A', '_blank');
      }
    },
    {
      id: 'chat',
      title: 'Live Chat',
      subtitle: 'Instant messaging',
      contact: 'Chat now',
      icon: ChatBubbleLeftRightIcon,
      color: 'purple',
      action: () => setActiveTab('chat')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Customer Support</h1>
          <p className="text-gray-300 text-lg">We're here to help you 24/7 with your supply chain needs</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Support team online</span>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="glass p-1 rounded-xl">
            <div className="flex space-x-1">
              {[
                { id: 'contact', label: 'Contact Us', icon: PhoneIcon },
                { id: 'chat', label: 'Live Chat', icon: ChatBubbleLeftRightIcon },
                { id: 'faq', label: 'Help Center', icon: QuestionMarkCircleIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg'
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
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'contact' && (
              <div className="space-y-6">
                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={method.action}
                        className="glass p-6 text-center cursor-pointer hover:bg-white/10 transition-all group"
                      >
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${method.color}-500/20 flex items-center justify-center group-hover:bg-${method.color}-500/30 transition-all`}>
                          <Icon className={`w-8 h-8 text-${method.color}-400`} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                        <p className="text-gray-300 text-sm mb-3">{method.subtitle}</p>
                        <p className={`text-${method.color}-300 font-medium`}>{method.contact}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 text-center">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Track Shipment', icon: '🚚', type: 'track', desc: 'Real-time tracking' },
                      { label: 'Return Product', icon: '↩️', type: 'return', desc: 'Easy returns' },
                      { label: 'Report Issue', icon: '⚠️', type: 'issue', desc: 'Technical support' },
                      { label: 'Account Help', icon: '👤', type: 'account', desc: 'Account assistance' }
                    ].map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickAction(item.type)}
                        className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all group border border-white/10 hover:border-white/20"
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <div className="font-medium text-sm mb-1">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.desc}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="glass p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Live Support Chat</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    <span>Avg response: 30 seconds</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="bg-black/20 rounded-xl p-4 h-96 overflow-y-auto mb-4 space-y-4 border border-white/10">
                  {chatHistory.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-sm ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'
                        }`}>
                          {msg.avatar}
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          msg.sender === 'user' 
                            ? 'bg-blue-500 text-white rounded-br-md' 
                            : 'bg-white/10 text-gray-200 rounded-bl-md'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-3 max-w-sm">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                          🤖
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl rounded-bl-md">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message here..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center gap-2 font-medium"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Send
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                {/* Search */}
                <div className="glass p-6">
                  <div className="relative max-w-md mx-auto">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search help articles..."
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-4">
                  {filteredFaqs.map((category, categoryIndex) => (
                    <motion.div
                      key={categoryIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                      className="glass p-6"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircleIcon className="w-6 h-6 text-green-400" />
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                            className="border border-white/10 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === `${categoryIndex}-${index}` ? null : `${categoryIndex}-${index}`)}
                              className="w-full p-4 text-left hover:bg-white/5 transition-all flex items-center justify-between group"
                            >
                              <span className="text-white font-medium group-hover:text-blue-300 transition-colors">
                                {faq.question}
                              </span>
                              <ChevronDownIcon 
                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                  expandedFaq === `${categoryIndex}-${index}` ? 'rotate-180' : ''
                                }`} 
                              />
                            </button>
                            <AnimatePresence>
                              {expandedFaq === `${categoryIndex}-${index}` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-white/10"
                                >
                                  <div className="p-4 bg-white/5">
                                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass p-8 text-center"
                  >
                    <ExclamationTriangleIcon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">No results found</h3>
                    <p className="text-gray-300 mb-4">Try different keywords or contact our support team</p>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                    >
                      Start Live Chat
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerSupport;