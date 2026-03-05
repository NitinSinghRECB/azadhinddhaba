import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../api';

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const { token } = useAuth();

    const fetchMenu = async () => {
        try {
            const res = await fetch(`${API_URL}/menu`);
            if (res.ok) setItems(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchMenu(); }, []);

    const toggleStatus = async (id) => {
        try {
            await fetch(`${API_URL}/menu/${id}/toggle`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchMenu();
        } catch (err) { alert('Failed to change status'); }
    };

    const deleteItem = async (id) => {
        if (!window.confirm('Delete this menu item?')) return;
        try {
            await fetch(`${API_URL}/menu/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchMenu();
        } catch (err) { alert('Failed to delete'); }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const url = editingItem ? `${API_URL}/menu/${editingItem._id}` : `${API_URL}/menu`;
            const method = editingItem ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchMenu();
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to save');
            }
        } catch (err) {
            alert('Failed to save item');
        }
    };

    return (
        <>
            <section className="admin-section active">
                <div className="section-toolbar">
                    <h3>Menu Management</h3>
                    <button className="btn btn-primary" onClick={handleAddNew}>+ Add Item</button>
                </div>
                <div className="menu-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <span className="item-name">{item.name}</span>
                                        {item.popular && ' ⭐'}
                                    </td>
                                    <td>{item.category}</td>
                                    <td>₹{item.price}{item.priceHalf && ` (H: ₹${item.priceHalf} / F: ₹${item.priceFull})`}</td>
                                    <td><span className={`type-badge ${item.isVeg ? 'veg' : 'nonveg'}`}>{item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</span></td>
                                    <td>
                                        <span className={`status-badge ${item.available ? 'available' : 'unavailable'}`}>
                                            {item.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                                            <button
                                                className="btn btn-sm"
                                                style={{ background: 'var(--admin-warning)', color: '#000' }}
                                                onClick={() => toggleStatus(item._id)}
                                            >
                                                {item.available ? 'Disable' : 'Enable'}
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item._id)}>Del</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Form Modal */}
            {isModalOpen && (
                <>
                    <div className="modal-overlay active" onClick={() => setIsModalOpen(false)}></div>
                    <div className="admin-modal active">
                        <div className="modal-header">
                            <h3>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Item Name *</label>
                                    <input type="text" name="name" defaultValue={editingItem?.name || ''} required />
                                </div>
                                <div className="form-group">
                                    <label>Category *</label>
                                    <input type="text" name="category" defaultValue={editingItem?.category || ''} required list="catList" />
                                    <datalist id="catList">
                                        {[...new Set(items.map(i => i.category))].map(c => <option key={c} value={c} />)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price (₹) *</label>
                                    <input type="number" name="price" defaultValue={editingItem?.price || ''} required min="0" />
                                </div>
                                <div className="form-group">
                                    <label>Half Price (₹)</label>
                                    <input type="number" name="priceHalf" defaultValue={editingItem?.priceHalf || ''} min="0" />
                                </div>
                                <div className="form-group">
                                    <label>Full Price (₹)</label>
                                    <input type="number" name="priceFull" defaultValue={editingItem?.priceFull || ''} min="0" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type</label>
                                    <select name="isVeg" defaultValue={editingItem?.isVeg !== undefined ? String(editingItem.isVeg) : 'true'}>
                                        <option value="true">Veg 🟢</option>
                                        <option value="false">Non-Veg 🔴</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Popular</label>
                                    <select name="popular" defaultValue={editingItem?.popular !== undefined ? String(editingItem.popular) : 'false'}>
                                        <option value="false">No</option>
                                        <option value="true">Yes ⭐</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Food Image</label>
                                <input type="file" name="image" accept="image/*" />
                                {editingItem?.image && <p style={{ fontSize: '12px', marginTop: '4px' }}>Current image will be kept if you do not select a new one.</p>}
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Save Item</button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminMenu;
