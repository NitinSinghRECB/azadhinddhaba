import React from 'react';

const AboutSection = () => {
    return (
        <>
            <section className="about-section" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content reveal">
                            <div className="section-header">
                                <span className="section-label">Our Story</span>
                                <h2 className="section-title">A Journey of <span className="accent">Flavours</span></h2>
                            </div>
                            <p>
                                Started as a humble roadside eatery, Azad Hind Dhaba has grown into a landmark destination
                                for food lovers traveling the highway. We believe in preserving the authentic taste of
                                North Indian cuisine while providing a comfortable and welcoming environment.
                            </p>
                            <p>
                                Our chefs bring years of experience and secret family recipes to the table, ensuring every
                                dish—from our rich paneer curries to our perfectly charred tandoori rotis—is an unforgettable experience.
                            </p>
                            <div className="about-highlights">
                                <div className="highlight">
                                    <span>👨‍🍳</span>
                                    <div>
                                        <strong>Expert Chefs</strong>
                                        <p>Masters of authentic dhaba-style cooking</p>
                                    </div>
                                </div>
                                <div className="highlight">
                                    <span>🌶️</span>
                                    <div>
                                        <strong>Fresh Spices</strong>
                                        <p>Locally sourced, ground fresh daily</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="about-visual reveal">
                            <div className="about-card card-1">
                                <div className="about-card-emoji">🏆</div>
                                <h3>10+</h3>
                                <p>Years of Legacy</p>
                            </div>
                            <div className="about-card">
                                <div className="about-card-emoji">🍽️</div>
                                <h3 style={{ color: 'var(--red-warm)', fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>50k+</h3>
                                <p>Happy Customers</p>
                            </div>
                            <div className="about-card">
                                <div className="about-card-emoji">🍲</div>
                                <h3 style={{ color: 'var(--red-warm)', fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800 }}>100+</h3>
                                <p>Daily Dishes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="reviews-section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Testimonials</span>
                        <h2 className="section-title">What Our Guests <span className="accent">Say</span></h2>
                    </div>
                    <div className="reviews-grid reveal">
                        <div className="review-card">
                            <div className="review-stars">⭐⭐⭐⭐⭐</div>
                            <p>"Best dhaba on this highway. The Paneer Butter Masala was incredibly rich, and the naans were perfectly crisp. Highly recommend!"</p>
                            <div className="review-author">
                                <div className="review-avatar">R</div>
                                <div>
                                    <strong>Rahul Sharma</strong><br />
                                    <small>Local Guide</small>
                                </div>
                            </div>
                        </div>
                        <div className="review-card">
                            <div className="review-stars">⭐⭐⭐⭐⭐</div>
                            <p>"Stopped here during a long drive. Fast service and very reasonable prices. The tandoori chicken is a must-try. Authentic village vibe."</p>
                            <div className="review-author">
                                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, var(--red-warm), var(--brown-deep))' }}>S</div>
                                <div>
                                    <strong>Sneha Gupta</strong><br />
                                    <small>Traveler</small>
                                </div>
                            </div>
                        </div>
                        <div className="review-card">
                            <div className="review-stars">⭐⭐⭐⭐</div>
                            <p>"Great place for family dinners. The staff is polite and the cleanliness is well maintained unlike regular roadside dhabas."</p>
                            <div className="review-author">
                                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, var(--gold), var(--brown-mid))' }}>A</div>
                                <div>
                                    <strong>Amit Kumar</strong><br />
                                    <small>Regular Customer</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section" id="contact">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Locate Us</span>
                        <h2 className="section-title">Plan Your <span className="accent">Visit</span></h2>
                        <p className="section-desc">Easily accessible from the main highway with ample parking space for cars and heavy vehicles.</p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-info reveal">
                            <div className="contact-card">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <strong>Location</strong>
                                    <p>Zero Point, Jungle Kauriya,<br />Gorakhpur, Uttar Pradesh, India</p>
                                    <a href="https://maps.google.com/?q=Azad+Hind+Dhaba+Jungle+Kauriya" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: '10px', fontSize: '0.8rem', padding: '8px 16px' }}>Get Directions</a>
                                </div>
                            </div>
                            <div className="contact-card">
                                <span className="contact-icon">📞</span>
                                <div>
                                    <strong>Call Us</strong>
                                    <p>+91 95981 81082</p>
                                    <a href="tel:+919598181082" className="btn btn-call btn-sm" style={{ marginTop: '10px', fontSize: '0.8rem', padding: '8px 16px' }}>Tap to Call</a>
                                </div>
                            </div>
                            <div className="contact-card">
                                <span className="contact-icon">🕒</span>
                                <div>
                                    <strong>Timing</strong>
                                    <p>Open 24 Hours, 7 Days a week</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--green-veg)', fontWeight: 600, marginTop: '4px' }}>Currently Open</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-map reveal">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5015820468!2d83.35!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbKwDUxJzAwLjAiTiA4M8KwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Azad Hind Dhaba Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;
