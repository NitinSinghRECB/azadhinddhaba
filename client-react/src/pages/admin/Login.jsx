import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../assets/admin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await login(username, password);
        if (res.success) {
            navigate('/admin');
        } else {
            setError(res.message || 'Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="login-screen" style={{ display: 'flex', minHeight: '100vh' }}>
            <div className="login-card">
                <div className="login-logo">🍛</div>
                <h1>Admin Panel</h1>
                <p>Azad Hind Dhaba & Restaurant</p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="login-error" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
