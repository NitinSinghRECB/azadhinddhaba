import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

const Navbar = ({ onCartClick }) => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="/" className="nav-logo">
                    <span className="logo-icon">🍛</span>
                    <div>
                        <span className="logo-name">Azad Hind</span>
                        <span className="logo-tag">Dhaba & Restaurant</span>
                    </div>
                </a>
                <div className="nav-links">
                    <a href="#menu">Menu</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                </div>
                <div className="nav-actions">
                    <button
                        className="cart-btn"
                        onClick={onCartClick}
                        aria-label="Open Cart"
                    >
                        🛒 <span className="cart-count">{cartCount}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
