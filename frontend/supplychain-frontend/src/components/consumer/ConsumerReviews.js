import React, { useState, useEffect } from 'react';

const ConsumerReviews = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
  const [showAddReview, setShowAddReview] = useState(false);

  useEffect(() => {
    if (product) {
      // Generate sample reviews
      const sampleReviews = [
        {
          id: 1,
          name: 'Sarah M.',
          rating: 5,
          comment: 'Amazing quality! Love being able to track where my food comes from.',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 2,
          name: 'John D.',
          rating: 4,
          comment: 'Great transparency in the supply chain. Fresh and organic as promised.',
          date: '2024-01-10',
          verified: true
        },
        {
          id: 3,
          name: 'Emily R.',
          rating: 5,
          comment: 'The blockchain verification gives me confidence in what I\'m buying.',
          date: '2024-01-08',
          verified: false
        }
      ];
      setReviews(sampleReviews);
    }
  }, [product]);

  const handleSubmitReview = () => {
    if (newReview.name && newReview.comment) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split('T')[0],
        verified: true
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '', name: '' });
      setShowAddReview(false);
    }
  };

  const averageRating = reviews.length > 0 ? 
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

  if (!product) {
    return (
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>⭐</div>
        <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#374151' }}>Product Reviews</h3>
        <p style={{ color: '#6b7280' }}>Select a product to view and add reviews</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
      {/* Reviews Summary */}
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '30px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          ⭐ Customer Reviews
        </h3>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px' }}>
            {averageRating}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} style={{ 
                fontSize: '24px', 
                color: star <= Math.round(averageRating) ? '#f59e0b' : '#e5e7eb',
                marginRight: '2px'
              }}>
                ⭐
              </span>
            ))}
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Based on {reviews.length} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div style={{ marginBottom: '25px' }}>
          {[5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            
            return (
              <div key={rating} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', marginRight: '10px', minWidth: '20px' }}>
                  {rating}⭐
                </span>
                <div style={{ flex: 1, background: '#e5e7eb', height: '8px', borderRadius: '4px', marginRight: '10px' }}>
                  <div style={{ 
                    width: `${percentage}%`, 
                    height: '100%', 
                    background: '#f59e0b', 
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '30px' }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setShowAddReview(!showAddReview)}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          ✍️ Write a Review
        </button>
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '30px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
            ✍️ Add Your Review
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Your Name
            </label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Rating
            </label>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setNewReview({...newReview, rating: star})}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: star <= newReview.rating ? '#f59e0b' : '#e5e7eb'
                  }}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              placeholder="Share your experience with this product..."
              rows="4"
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSubmitReview}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowAddReview(false)}
              style={{
                background: '#e5e7eb',
                color: '#374151',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '30px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
          💬 Recent Reviews
        </h3>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {reviews.map(review => (
            <div key={review.id} style={{
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              marginBottom: '15px',
              background: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                      {review.name}
                    </h4>
                    {review.verified && (
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontWeight: '600'
                      }}>
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', marginBottom: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} style={{ 
                        fontSize: '16px', 
                        color: star <= review.rating ? '#f59e0b' : '#e5e7eb'
                      }}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerReviews;