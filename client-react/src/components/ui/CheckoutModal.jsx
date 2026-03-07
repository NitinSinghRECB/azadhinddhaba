import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { API_URL } from '../../api';

const CheckoutModal = ({ onClose, cartTotal }) => {
    const { cart, clearCart } = useCart();
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [freeAbove, setFreeAbove] = useState(500);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/settings`)
            .then(res => res.json())
            .then(data => {
                setDeliveryFee(data.deliveryFee || 0);
                setFreeAbove(data.freeDeliveryAbove || 500);
            })
            .catch(console.error);
    }, []);

    const isFreeDelivery = cartTotal >= freeAbove;
    const finalDelivery = isFreeDelivery ? 0 : deliveryFee;
    const grandTotal = cartTotal + finalDelivery;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.target);
        const customerName = formData.get('name');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const notes = formData.get('notes') || '';

        const orderPayload = {
            customerName,
            phone,
            address,
            notes,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                variant: item.type
            })),
            subtotal: cartTotal,
            deliveryFee: finalDelivery,
            total: grandTotal,
            paymentMethod: 'cod'
        };

        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            if (res.ok) {
                // Build WhatsApp message
                const itemsList = cart.map(i => `• ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`).join('\n');
                const msg = `🍛 *New Order — Azad Hind Dhaba*\n\n👤 *Name:* ${customerName}\n📞 *Phone:* ${phone}\n📍 *Address:* ${address}\n\n📋 *Items:*\n${itemsList}\n\n💰 *Subtotal:* ₹${cartTotal}\n🚚 *Delivery:* ${isFreeDelivery ? 'FREE' : `₹${deliveryFee}`}\n💵 *Total: ₹${grandTotal}*\n${notes ? `\n📝 *Note:* ${notes}` : ''}`;

                // Open WhatsApp with the order message
                window.open(`https://wa.me/919598181082?text=${encodeURIComponent(msg)}`, '_blank');

                clearCart();
                setSuccess(true);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (err) {
            alert('Network error. Please check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <>
                <div className="modal-overlay active" onClick={onClose}></div>
                <div className="success-modal active" style={{ padding: '48px 32px' }}>
                    <div className="success-icon">✅</div>
                    <h2>Order Sent via WhatsApp!</h2>
                    <p>Your order details have been sent. We'll confirm shortly!</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Check your WhatsApp for the order confirmation.</p>
                    <div className="success-actions">
                        <button className="btn btn-primary" onClick={onClose}>Continue Browsing</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="modal-overlay active" onClick={onClose}></div>
            <div className="checkout-modal active">
                <div className="modal-header">
                    <h3>🧾 Complete Your Order</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="checkout-grid">
                        {/* Left: Delivery Details */}
                        <div className="checkout-form">
                            <h4>📋 Delivery Details</h4>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" placeholder="e.g. Rahul Kumar" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" placeholder="+91 98765 43210" required pattern="[0-9]{10}" />
                                <small>We'll send order confirmation via WhatsApp</small>
                            </div>
                            <div className="form-group">
                                <label>Delivery Address *</label>
                                <textarea name="address" placeholder="House no., Street, Landmark, City" required rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Special Instructions</label>
                                <textarea name="notes" placeholder="e.g. Extra spicy, no onion, call before delivery..." rows="2"></textarea>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="checkout-summary">
                            <h4>🧮 Order Summary</h4>

                            <div style={{ maxHeight: '160px', overflowY: 'auto', marginBottom: '12px', paddingRight: '4px' }}>
                                {cart.map((item, idx) => (
                                    <div key={idx} className="summary-row">
                                        <span>{item.name} × {item.quantity}</span>
                                        <strong>₹{item.price * item.quantity}</strong>
                                    </div>
                                ))}
                            </div>

                            <hr />
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span style={{ color: isFreeDelivery ? 'var(--green-veg)' : 'inherit' }}>
                                    {isFreeDelivery ? '🎉 FREE' : `₹${deliveryFee}`}
                                </span>
                            </div>
                            {!isFreeDelivery && (
                                <p style={{ fontSize: '0.75rem', color: 'var(--green-veg)', fontWeight: 500, margin: '4px 0' }}>
                                    Add ₹{freeAbove - cartTotal} more for free delivery!
                                </p>
                            )}
                            <hr />
                            <div className="summary-row total">
                                <span>Total to Pay</span>
                                <span>₹{grandTotal}</span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-block"
                                disabled={submitting}
                                style={{
                                    marginTop: '20px', padding: '14px 28px', fontSize: '1rem',
                                    background: '#25D366', color: 'white', borderRadius: '14px',
                                    fontWeight: 700, boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                                }}
                            >
                                {submitting ? '⏳ Placing Order...' : `💬 Place Order via WhatsApp · ₹${grandTotal}`}
                            </button>
                            <p className="cart-note">Your order will be sent directly to us on WhatsApp</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CheckoutModal;
