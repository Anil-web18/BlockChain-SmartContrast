import React, { useState, useEffect } from 'react';

const ProductVerification = ({ product }) => {
  const [verificationStatus, setVerificationStatus] = useState('checking');
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    if (product) {
      // Simulate verification process
      setTimeout(() => {
        setVerificationStatus('verified');
        setCertifications([
          { name: 'Organic Certified', icon: '🌱', verified: true },
          { name: 'Fair Trade', icon: '🤝', verified: true },
          { name: 'Non-GMO', icon: '🧬', verified: Math.random() > 0.3 },
          { name: 'Carbon Neutral', icon: '🌍', verified: Math.random() > 0.5 },
          { name: 'Halal Certified', icon: '☪️', verified: Math.random() > 0.4 }
        ]);
      }, 2000);
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
        <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#374151' }}>Product Verification</h3>
        <p style={{ color: '#6b7280' }}>Select a product to verify its authenticity and certifications</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {/* Blockchain Verification */}
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '30px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          🔗 Blockchain Verification
        </h3>

        {verificationStatus === 'checking' ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ color: '#6b7280' }}>Verifying on blockchain...</p>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '40px'
              }}>
                ✅
              </div>
              <h4 style={{ color: '#10b981', fontSize: '20px', fontWeight: '600' }}>
                Authenticity Verified
              </h4>
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                Blockchain Details:
              </h5>
              <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Transaction Hash:</strong> {product.transactionHash}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Block Number:</strong> #{Math.floor(Math.random() * 1000000)}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Network:</strong> Ethereum Mainnet
                </div>
                <div>
                  <strong>Confirmations:</strong> 1,247
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
                🔒 Tamper-proof record
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '30px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          🏆 Certifications & Standards
        </h3>

        {verificationStatus === 'checking' ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#6b7280' }}>Loading certifications...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {certifications.map((cert, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                background: cert.verified ? '#f0fdf4' : '#fef2f2',
                border: `2px solid ${cert.verified ? '#10b981' : '#ef4444'}`,
                borderRadius: '10px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '24px', marginRight: '15px' }}>
                  {cert.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: cert.verified ? '#166534' : '#dc2626',
                    marginBottom: '2px'
                  }}>
                    {cert.name}
                  </h4>
                  <p style={{ 
                    fontSize: '12px', 
                    color: cert.verified ? '#16a34a' : '#ef4444' 
                  }}>
                    {cert.verified ? '✅ Verified' : '❌ Not Certified'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety & Quality */}
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '30px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          🛡️ Safety & Quality
        </h3>

        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{ background: '#f0f9ff', padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '20px', marginRight: '10px' }}>🧪</span>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>
                Lab Testing
              </h4>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Passed all safety tests • Last tested: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div style={{ background: '#fef3c7', padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '20px', marginRight: '10px' }}>📊</span>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>
                Quality Score
              </h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, background: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
                <div style={{ 
                  width: '92%', 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #10b981, #059669)', 
                  borderRadius: '4px' 
                }}></div>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>92/100</span>
            </div>
          </div>

          <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '20px', marginRight: '10px' }}>🌱</span>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#166534' }}>
                Sustainability
              </h4>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Carbon footprint: 2.1kg CO₂ • Recyclable packaging
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductVerification;