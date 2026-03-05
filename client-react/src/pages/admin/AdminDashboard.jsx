import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0, todayOrders: 0, pendingOrders: 0, totalRevenue: 0, todayRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    fetch(`${API_URL}/orders/stats/summary`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(`${API_URL}/orders?limit=5`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                if (statsRes.ok) setStats(await statsRes.json());
                if (ordersRes.ok) {
                    const oData = await ordersRes.json();
                    setRecentOrders(oData.orders);
                }
            } catch (err) {
                console.error('Dashboard load error', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [token]);

    return (
        <section className="admin-section active">
            <div className="stats-grid">
                <div className="stat-card stat-orders">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>{loading ? '...' : stats.totalOrders}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
                <div className="stat-card stat-today">
                    <div className="stat-icon">📅</div>
                    <div className="stat-info">
                        <h3>{loading ? '...' : stats.todayOrders}</h3>
                        <p>Today's Orders</p>
                    </div>
                </div>
                <div className="stat-card stat-pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                        <h3>{loading ? '...' : stats.pendingOrders}</h3>
                        <p>Pending</p>
                    </div>
                </div>
                <div className="stat-card stat-revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>{loading ? '...' : `₹${stats.totalRevenue.toLocaleString()}`}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                <div className="stat-card stat-today-rev">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                        <h3>{loading ? '...' : `₹${stats.todayRevenue.toLocaleString()}`}</h3>
                        <p>Today's Revenue</p>
                    </div>
                </div>
            </div>

            <div className="recent-orders">
                <h3>Recent Orders</h3>
                <div className="orders-list">
                    {loading ? <p>Loading...</p> : recentOrders.length === 0 ? <p>No recent orders.</p> : recentOrders.map(o => (
                        <div className="order-card" key={o._id}>
                            <div className="order-header">
                                <span className="order-id">{o.orderId}</span>
                                <span className="order-time">{new Date(o.createdAt).toLocaleString()}</span>
                                <span className={`order-status ${o.status}`}>{o.status.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="order-customer">
                                <span>👤 <strong>{o.customerName}</strong></span>
                                <span>📞 {o.phone}</span>
                            </div>
                            <div className="order-total">
                                <span>Total</span>
                                <span>₹{o.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
