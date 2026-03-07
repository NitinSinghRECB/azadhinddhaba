import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>Azad Hind</h3>
                        <p>Dhaba & Restaurant</p>
                        <p className="footer-desc">Authentic North Indian food, fast service, and a welcoming dhaba experience on the highway. Serving happiness since decades.</p>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <a href="#menu">Order Online</a>
                        <a href="#gallery">Photo Gallery</a>
                        <a href="#about">Our Story</a>
                        <a href="#contact">Find Us</a>
                    </div>

                    <div className="footer-links">
                        <h4>Services</h4>
                        <a href="#menu">Dine In</a>
                        <a href="#menu">Takeaway</a>
                        <a href="#menu">Home Delivery</a>
                        <a href="#contact">Catering</a>
                    </div>

                    <div className="footer-contact">
                        <h4>Contact Us</h4>
                        <p>📞 +91 95981 81082</p>
                        <p>📍 Zero Point, Jungle Kauriya, Gorakhpur, UP</p>
                        <p>🕒 Open 24/7</p>
                        <div className="footer-social">
                            <a href="https://wa.me/919473996773" target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
                            <a href="tel:+919598181082" aria-label="Call Us">📞</a>
                            <a href="https://maps.google.com/?q=Azad+Hind+Dhaba+Jungle+Kauriya" target="_blank" rel="noreferrer" aria-label="Maps">📍</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Azad Hind Dhaba & Restaurant. All rights reserved.</p>
                    <p><Link to="/admin/login" className="admin-link">Admin Login</Link></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
