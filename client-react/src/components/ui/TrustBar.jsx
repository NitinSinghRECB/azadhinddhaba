import React from 'react';

const TrustBar = () => {
    return (
        <div className="trust-bar">
            <div className="container">
                <div className="trust-items reveal">
                    <div className="trust-item">
                        <span className="trust-icon">⭐</span>
                        <div>
                            <strong>4.6 rating</strong><br />
                            <span>490+ Google reviews</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">💰</span>
                        <div>
                            <strong>Budget Friendly</strong><br />
                            <span>₹10 – ₹300 range</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">👨‍👩‍👧‍👦</span>
                        <div>
                            <strong>Family Perfect</strong><br />
                            <span>Dine-in & Takeaway</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
