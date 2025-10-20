import React, { useState } from 'react';
import ProductScanner from './ProductScanner';
import ProductJourney from './ProductJourney';
import ProductVerification from './ProductVerification';
import ConsumerReviews from './ConsumerReviews';
import CompanyDirectory from './CompanyDirectory';
import ProductStore from './ProductStore';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import CustomerSupport from './CustomerSupport';

const ConsumerPortal = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState('scanner');
  const [scannedProduct, setScannedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState(null);

  const handleProductScanned = (productId) => {
    // Create a mock product if not found in transactions
    let product = transactions?.find(t => t.transactionId === productId || t.itemId === productId);
    
    if (!product) {
      // Create mock product data for demo
      product = {
        transactionId: productId,
        itemId: productId,
        supplierId: 'SUP001',
        customerId: 'CUST001',
        orderAmount: Math.floor(Math.random() * 1000) + 100,
        quantityShipped: Math.floor(Math.random() * 50) + 10,
        location: 'Distribution Center',
        orderStatus: Math.random() > 0.5 ? 'Delivered' : 'In Transit',
        timestamp: new Date().toISOString(),
        temperature: Math.floor(Math.random() * 10) + 15,
        humidity: Math.floor(Math.random() * 20) + 40,
        gpsCoordinates: `${(Math.random() * 180 - 90).toFixed(4)}, ${(Math.random() * 360 - 180).toFixed(4)}`
      };
    }
    
    setScannedProduct(product);
    setActiveTab('journey');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 200%)', 
      padding: '15px 10px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      {/* Enhanced Consumer Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        color: 'white', 
        padding: '20px 10px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px 20px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '15px',
            animation: 'bounce 2s infinite'
          }}>🛒</div>
          <h1 style={{ 
            fontSize: window.innerWidth < 768 ? '32px' : '42px', 
            fontWeight: 'bold', 
            marginBottom: '12px',
            lineHeight: '1.2',
            background: 'linear-gradient(45deg, #fff, #f0f9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>Consumer Portal</h1>
          <p style={{ 
            fontSize: window.innerWidth < 768 ? '16px' : '20px', 
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto',
            fontWeight: '300'
          }}>🌱 Track your products from farm to table with blockchain transparency</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '30px', 
        gap: '8px', 
        flexWrap: 'wrap',
        padding: '0 10px'
      }}>
        {[
          { id: 'scanner', label: '📱 Scan Product', icon: '📱' },
          { id: 'store', label: '🛍️ Shop Products', icon: '🛍️' },
          { id: 'cart', label: '🛒 Cart', icon: '🛒', badge: cartItems.length },
          { id: 'journey', label: '🗺️ Product Journey', icon: '🗺️' },
          { id: 'verify', label: '✅ Verify Authenticity', icon: '✅' },
          { id: 'reviews', label: '⭐ Reviews & Ratings', icon: '⭐' },
          { id: 'companies', label: '🏢 Companies', icon: '🏢' },
          { id: 'support', label: '💬 Support', icon: '💬' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, #fff, #f0f9ff)' 
                : 'rgba(255,255,255,0.15)',
              color: activeTab === tab.id ? '#333' : 'white',
              border: activeTab === tab.id 
                ? '2px solid rgba(255,255,255,0.3)' 
                : '2px solid rgba(255,255,255,0.1)',
              padding: '14px 20px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              minWidth: '130px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              boxShadow: activeTab === tab.id 
                ? '0 8px 25px rgba(0,0,0,0.15)' 
                : '0 4px 15px rgba(0,0,0,0.1)',
              transform: activeTab === tab.id ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            {tab.icon} {tab.label}
            {tab.badge > 0 && (
              <span style={{
                marginLeft: '8px',
                background: '#ef4444',
                color: 'white',
                fontSize: '12px',
                borderRadius: '50%',
                padding: '2px 6px',
                minWidth: '20px',
                height: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'scanner' && (
          <ProductScanner onProductScanned={handleProductScanned} transactions={transactions} />
        )}
        {activeTab === 'store' && (
          <ProductStore 
            onAddToCart={(product) => {
              const existingItem = cartItems.find(item => item.id === product.id);
              if (existingItem) {
                setCartItems(cartItems.map(item => 
                  item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ));
              } else {
                setCartItems([...cartItems, { ...product, quantity: 1 }]);
              }
            }}
            cartItems={cartItems}
          />
        )}
        {activeTab === 'cart' && (
          cartItems.length === 0 || activeTab !== 'checkout' ? (
            <ShoppingCart 
              cartItems={cartItems}
              onUpdateQuantity={(id, quantity) => {
                if (quantity === 0) {
                  setCartItems(cartItems.filter(item => item.id !== id));
                } else {
                  setCartItems(cartItems.map(item => 
                    item.id === id ? { ...item, quantity } : item
                  ));
                }
              }}
              onRemoveItem={(id) => {
                setCartItems(cartItems.filter(item => item.id !== id));
              }}
              onCheckout={() => setActiveTab('checkout')}
            />
          ) : null
        )}
        {activeTab === 'checkout' && (
          orderData ? (
            <OrderConfirmation 
              orderData={orderData}
              onContinueShopping={() => {
                setActiveTab('store');
                setOrderData(null);
                setCartItems([]);
              }}
            />
          ) : (
            <Checkout 
              cartItems={cartItems}
              onOrderComplete={(data) => {
                setOrderData(data);
              }}
              onBack={() => setActiveTab('cart')}
            />
          )
        )}
        {activeTab === 'journey' && (
          <ProductJourney product={scannedProduct} />
        )}
        {activeTab === 'verify' && (
          <ProductVerification product={scannedProduct} />
        )}
        {activeTab === 'reviews' && (
          <ConsumerReviews product={scannedProduct} />
        )}
        {activeTab === 'companies' && (
          <CompanyDirectory />
        )}
        {activeTab === 'support' && (
          <CustomerSupport />
        )}
      </div>

      {/* Consumer Benefits */}
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px', 
          maxWidth: '1000px', 
          margin: '0 auto',
          padding: '0 10px'
        }}>
          {[
            { icon: '🔒', title: 'Authenticity Guaranteed', desc: 'Blockchain-verified products' },
            { icon: '🌱', title: 'Sustainability Tracking', desc: 'See environmental impact' },
            { icon: '🚨', title: 'Safety Alerts', desc: 'Real-time recall notifications' },
            { icon: '📊', title: 'Transparency', desc: 'Complete supply chain visibility' }
          ].map((benefit, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '15px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, background 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{benefit.icon}</div>
              <h3 style={{ fontSize: '16px', marginBottom: '6px', fontWeight: '600' }}>{benefit.title}</h3>
              <p style={{ fontSize: '12px', opacity: 0.8, lineHeight: '1.4' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ConsumerPortal;