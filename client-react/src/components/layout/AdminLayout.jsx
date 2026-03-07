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
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="/logo.png" alt="Azad Hind Dhaba Logo" className="sidebar-logo" />
                    <div>
                        <h3>Azad Hind</h3>
                        <small>Admin Panel</small>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/admin" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{'\u{1F4CA}'}</span> Dashboard</NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{'\u{1F4E6}'}</span> Orders</NavLink>
                    <NavLink to="/admin/menu" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{'\u{1F37D}\uFE0F'}</span> Menu</NavLink>
                    <NavLink to="/admin/gallery" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{'\u{1F4F8}'}</span> Gallery</NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><span>{'\u2699\uFE0F'}</span> Settings</NavLink>
                </nav>
                <div className="sidebar-footer">
                    <a href="/" target="_blank" className="nav-item"><span>{'\u{1F310}'}</span> View Website</a>
                    <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
                        <span>{'\u{1F6AA}'}</span> Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <button className="sidebar-toggle">{'\u2630'}</button>
                    <div className="admin-header-title">
                        <img src="/logo.png" alt="Azad Hind Dhaba Logo" className="admin-header-logo" />
                        <h2>Admin Panel</h2>
                    </div>
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
