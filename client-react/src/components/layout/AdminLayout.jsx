import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/admin.css';

const AdminLayout = () => {
    const { username, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout" style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <span>🍛</span>
                    <div>
                        <h3>Azad Hind</h3>
                        <small>Admin Panel</small>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/admin" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>📊</span> Dashboard</NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>📦</span> Orders</NavLink>
                    <NavLink to="/admin/menu" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>🍽️</span> Menu</NavLink>
                    <NavLink to="/admin/gallery" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>📸</span> Gallery</NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>⚙️</span> Settings</NavLink>
                </nav>
                <div className="sidebar-footer">
                    <a href="/" target="_blank" className="nav-item"><span>🌐</span> View Website</a>
                    <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <button className="sidebar-toggle">☰</button>
                    <h2>Admin Panel</h2>
                    <div className="header-actions">
                        <span>{username}</span>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
