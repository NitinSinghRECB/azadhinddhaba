import React from 'react';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>

            {/* Animated Particles */}
            <div className="hero-particles">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-star">⭐</span>
                    <span>4.6/5 on Google Reviews</span>
                </div>

                <h1 className="hero-title">
                    <span className="title-line">Flavours of the</span>
                    <span className="title-line accent">Highway</span>
                </h1>

                <p className="hero-tagline">Authentic Dhaba Experience</p>

                <p className="hero-desc reveal">
                    Stop by for the most authentic North Indian food, sizzling tandoori specialties, and
                    our famous stuffed parathas. Fast service, great taste, and budget-friendly pricing.
                </p>

                <div className="hero-cta reveal">
                    <a href="#menu" className="btn btn-primary btn-lg">Order Online Now</a>
                    <a href="#about" className="btn btn-outline btn-lg">View Our Story</a>
                </div>

                <div className="hero-features reveal">
                    <div className="hero-feature">
                        <span>🚗</span>
                        <div><p>Free</p><small>Parking</small></div>
                    </div>
                    <div className="hero-feature">
                        <span>🕒</span>
                        <div><p>24/7</p><small>Open</small></div>
                    </div>
                    <div className="hero-feature">
                        <span>🛵</span>
                        <div><p>Fast</p><small>Delivery</small></div>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                Scroll Down
                <div className="scroll-arrow"></div>
            </div>
        </section>
    );
};

export default Hero;
