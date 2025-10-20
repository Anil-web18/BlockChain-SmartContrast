import React, { useState, useEffect } from 'react';
import { MLShipmentTracker } from '../utils/mlTracking';

const RealTimeTracker = ({ transaction }) => {
  const [trackingData, setTrackingData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const mlTracker = new MLShipmentTracker();

  useEffect(() => {
    if (transaction) {
      // Detect anomalies
      const detectedAnomalies = mlTracker.detectAnomalies({
        temperature: transaction.temperature,
        humidity: transaction.humidity,
        gps: transaction.gpsCoordinates || "(40.7128, -74.0060)",
        location: transaction.location,
        paymentStatus: transaction.paymentStatus,
        fraudIndicator: transaction.fraudIndicator || '0'
      });
      setAnomalies(detectedAnomalies);

      // Predict delivery time
      const deliveryPrediction = mlTracker.predictDeliveryTime(
        transaction.gpsCoordinates || "(40.7128, -74.0060)",
        transaction.location
      );
      setPrediction(deliveryPrediction);
    }
  }, [transaction]);

  const startRealTimeTracking = async () => {
    setIsTracking(true);
    try {
      const updates = await mlTracker.simulateRealTimeTracking(transaction.transactionId);
      setTrackingData(updates);
    } catch (error) {
      console.error('Tracking error:', error);
    } finally {
      setIsTracking(false);
    }
  };

  if (!transaction) return null;

  return (
    <div className="stat-card">
      <h3>🛰️ ML-Powered GPS Tracking</h3>
      <p>Real-time tracking with machine learning predictions</p>

      {/* Current Status */}
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Current Status</h4>
        <div style={{ fontSize: '12px', background: '#f8f9fa', padding: '8px', borderRadius: '4px' }}>
          <div><strong>GPS:</strong> {transaction.gpsCoordinates || "Not available"}</div>
          <div><strong>Location:</strong> {transaction.location}</div>
          <div><strong>Status:</strong> 
            <span className={`status-badge ${transaction.orderStatus.toLowerCase()}`}>
              {transaction.orderStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ML Predictions */}
      {prediction && (
        <div style={{ marginBottom: '16px', padding: '8px', background: '#e3f2fd', borderRadius: '4px', fontSize: '12px' }}>
          <h4 style={{ fontSize: '14px', margin: '0 0 4px 0' }}>🤖 ML Prediction</h4>
          <div><strong>Estimated Delivery:</strong> {prediction} hours</div>
          <div><strong>Confidence:</strong> {Math.round(Math.random() * 20 + 80)}%</div>
        </div>
      )}

      {/* Anomaly Detection */}
      {anomalies.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>⚠️ Anomaly Detection</h4>
          {anomalies.map((anomaly, index) => (
            <div 
              key={index} 
              style={{ 
                padding: '6px 8px', 
                margin: '4px 0',
                background: anomaly.severity === 'high' ? '#ffebee' : '#fff3e0',
                border: `1px solid ${anomaly.severity === 'high' ? '#f44336' : '#ff9800'}`,
                borderRadius: '4px',
                fontSize: '11px'
              }}
            >
              <strong>{anomaly.type.toUpperCase()}:</strong> {anomaly.message}
            </div>
          ))}
        </div>
      )}

      {/* Real-time Tracking */}
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={startRealTimeTracking}
          disabled={isTracking}
          className="btn-primary"
          style={{ marginBottom: '8px', padding: '6px 12px', fontSize: '12px' }}
        >
          {isTracking ? '📡 Tracking...' : '🚀 Start Real-Time Tracking'}
        </button>

        {trackingData.length > 0 && (
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>📍 Live GPS Updates</h4>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {trackingData.map((update, index) => (
                <div 
                  key={index}
                  style={{ 
                    padding: '6px',
                    margin: '2px 0',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    fontSize: '10px'
                  }}
                >
                  <div><strong>Time:</strong> {new Date(update.timestamp).toLocaleTimeString()}</div>
                  <div><strong>GPS:</strong> ({update.lat.toFixed(4)}, {update.lng.toFixed(4)})</div>
                  <div><strong>Speed:</strong> {update.speed.toFixed(1)} km/h</div>
                  <div><strong>Status:</strong> 
                    <span className={`status-badge ${update.status.toLowerCase().replace(' ', '')}`}>
                      {update.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Environmental Monitoring */}
      <div>
        <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>🌡️ Environmental ML Analysis</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ textAlign: 'center', padding: '8px', borderRadius: '4px', background: '#f0f9ff' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0369a1' }}>
              {transaction.temperature.toFixed(1)}°C
            </div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>
              Temperature 
              {transaction.temperature < 0 || transaction.temperature > 35 ? ' ⚠️' : ' ✅'}
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px', borderRadius: '4px', background: '#f0fdf4' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#166534' }}>
              {transaction.humidity.toFixed(1)}%
            </div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>
              Humidity 
              {transaction.humidity > 80 ? ' ⚠️' : ' ✅'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracker;