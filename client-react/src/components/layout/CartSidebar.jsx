import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CheckoutModal from '../ui/CheckoutModal';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const total = getCartTotal();

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <aside className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
                <div className="cart-header">
                    <h3>🛒 Your Order</h3>
                    <button className="close-cart" onClick={onClose}>&times;</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart" style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '16px' }}>🛍️</span>
                            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Your cart is empty</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '20px' }}>Add delicious items from our menu!</p>
                            <button className="btn btn-primary" onClick={onClose}>Browse Menu</button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div className="cart-item" key={`${item._id}-${item.type}-${idx}`}>
                                <div className="cart-item-info" style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                            width: '16px', height: '16px', borderRadius: '3px', fontSize: '8px',
                                            border: `2px solid ${item.isVeg ? 'var(--green-veg)' : 'var(--red-nonveg)'}`,
                                            background: 'white'
                                        }}>
                                            {item.isVeg ? '🟢' : '🔴'}
                                        </span>
                                        <span className="cart-item-name">{item.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {item.type !== 'full' && (
                                            <span style={{
                                                fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase',
                                                background: 'var(--cream-mid)', padding: '2px 8px', borderRadius: '4px',
                                                color: 'var(--text-light)'
                                            }}>{item.type}</span>
                                        )}
                                        <span className="cart-item-price">₹{item.price}</span>
                                    </div>
                                </div>
                                <div className="qty-control cart-qty">
                                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.type, -1)}>−</button>
                                    <div className="qty-value">{item.quantity}</div>
                                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.type, 1)}>+</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="cart-row">
                                <span>Subtotal ({getCartCount()} items)</span>
                                <strong>₹{total}</strong>
                            </div>
                            <p className="cart-note" style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '4px' }}>
                                Delivery charges calculated at checkout
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button className="btn btn-primary btn-block" onClick={() => setIsCheckoutOpen(true)}>
                                Proceed to Checkout · ₹{total}
                            </button>
                            <button
                                className="btn btn-block"
                                onClick={clearCart}
                                style={{
                                    background: 'transparent', color: 'var(--text-light)', fontSize: '0.82rem',
                                    padding: '8px', border: '1px solid var(--cream-dark)'
                                }}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </aside>

            {/* Checkout Modal */}
            {isCheckoutOpen && (
                <CheckoutModal
                    onClose={() => setIsCheckoutOpen(false)}
                    cartTotal={total}
                />
            )}
        </>
    );
};

export default CartSidebar;
