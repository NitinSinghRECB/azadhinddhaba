import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../api';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        freeDeliveryRadius: 1,
        deliveryChargePerKm: 10,
        maxDeliveryRadius: 15,
        whatsappNumber: '',
        isOpen: true
    });
    const [saving, setSaving] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        fetch(`${API_URL}/settings`)
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/settings`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                alert('Settings saved successfully!');
            } else {
                alert('Failed to save settings');
            }
        } catch (err) {
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;
        if (type === 'number') finalValue = Number(value);
        if (name === 'isOpen') finalValue = value === 'true';

        setSettings(prev => ({ ...prev, [name]: finalValue }));
    };

    return (
        <section className="admin-section active">
            <h3>Delivery & Settings</h3>
            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Free Delivery Radius (km)</label>
                        <input
                            type="number" step="0.5" min="0"
                            name="freeDeliveryRadius"
                            value={settings.freeDeliveryRadius}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Delivery Charge per km (₹)</label>
                        <input
                            type="number" step="1" min="0"
                            name="deliveryChargePerKm"
                            value={settings.deliveryChargePerKm}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Max Delivery Radius (km)</label>
                        <input
                            type="number" step="0.5" min="0"
                            name="maxDeliveryRadius"
                            value={settings.maxDeliveryRadius}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>WhatsApp Number</label>
                        <input
                            type="text"
                            name="whatsappNumber"
                            value={settings.whatsappNumber}
                            onChange={handleChange}
                            placeholder="919598181082"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Shop Status</label>
                        <select name="isOpen" value={String(settings.isOpen)} onChange={handleChange}>
                            <option value="true">Open</option>
                            <option value="false">Closed</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </section>
    );
};

export default AdminSettings;
