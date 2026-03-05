import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../api';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const { token } = useAuth();

    const fetchOrders = async () => {
        try {
            const url = filter ? `${API_URL}/orders?status=${filter}` : `${API_URL}/orders`;
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders);
            }
        } catch (err) {
            console.error('Failed to load orders', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, [filter, token]);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/orders/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchOrders();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const clearAllOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('All orders have been cleared.');
                fetchOrders();
                setShowConfirmClear(false);
            }
        } catch (err) {
            alert('Failed to clear orders');
        }
    };

    return (
        <section className="admin-section active">
            <div className="section-toolbar">
                <h3>All Orders</h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <select
                        className="filter-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="btn btn-danger btn-sm" onClick={() => setShowConfirmClear(true)}>🗑️ Clear All</button>
                </div>
            </div>

            <div className="orders-list">
                {loading ? <p>Loading orders...</p> : orders.length === 0 ? <p>No orders found.</p> : orders.map(o => (
                    <div className="order-card" key={o._id}>
                        <div className="order-header">
                            <span className="order-id">{o.orderId}</span>
                            <span className="order-time">{new Date(o.createdAt).toLocaleString()}</span>
                            <span className={`order-status ${o.status}`}>{o.status.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="order-customer">
                            <span>👤 <strong>{o.customerName}</strong></span>
                            <span>📞 <a href={`tel:${o.phone}`} style={{ color: 'var(--admin-info)' }}>{o.phone}</a></span>
                            <span>📍 {o.address}</span>
                        </div>
                        <div className="order-items-list">
                            {o.items.map((i, idx) => (
                                <div className="order-item-row" key={idx}>
                                    <span>{i.quantity} × {i.name}</span>
                                    <span>₹{i.price * i.quantity}</span>
                                </div>
                            ))}
                            {o.deliveryCharge > 0 && <div className="order-item-row"><span>Delivery</span><span>₹{o.deliveryCharge}</span></div>}
                            <div className="order-total"><span>Total</span><span>₹{o.total}</span></div>
                        </div>
                        {o.notes && <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>📝 {o.notes}</p>}
                        <div className="order-actions">
                            <select
                                className="order-status-select"
                                value={o.status}
                                onChange={(e) => updateStatus(o._id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing</option>
                                <option value="out_for_delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <a href={`https://wa.me/${o.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-success btn-sm">💬 WhatsApp</a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Clear Confirm Modal */}
            <div className={`modal-overlay ${showConfirmClear ? 'active' : ''}`} onClick={() => setShowConfirmClear(false)}></div>
            <div className={`admin-modal ${showConfirmClear ? 'active' : ''}`} style={{ maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛑</div>
                <h3 style={{ color: 'var(--admin-danger) !important', marginBottom: '12px' }}>Clear All Orders?</h3>
                <p style={{ marginBottom: '24px', color: 'var(--admin-text-dim) !important' }}>
                    This action will permanently delete all order history. This cannot be undone. Are you absolutely sure?
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                        className="btn"
                        style={{ background: 'var(--admin-surface-2)' }}
                        onClick={() => setShowConfirmClear(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={clearAllOrders}
                    >
                        Yes, Clear All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AdminOrders;
