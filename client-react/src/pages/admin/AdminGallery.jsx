import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL, getImageUrl } from '../../api';

const AdminGallery = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { token } = useAuth();

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${API_URL}/gallery`);
            if (res.ok) setItems(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchGallery(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this photo?')) return;
        try {
            await fetch(`${API_URL}/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchGallery();
        } catch (err) { alert('Failed to delete'); }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData(e.target);

        try {
            const res = await fetch(`${API_URL}/gallery`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchGallery();
            } else {
                const err = await res.json();
                alert(err.message || 'Upload failed');
            }
        } catch (err) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <section className="admin-section active">
                <div className="section-toolbar">
                    <h3>Gallery Management</h3>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Upload Photo</button>
                </div>

                <div className="gallery-admin-grid">
                    {items.length === 0 ? (
                        <p style={{ color: 'var(--admin-text-muted)', padding: '40px', textAlign: 'center', gridColumn: '1/-1' }}>
                            No photos uploaded yet.
                        </p>
                    ) : (
                        items.map(item => (
                            <div className="gallery-admin-item" key={item._id}>
                                <img src={getImageUrl(item.image)} alt={item.title} loading="lazy" />
                                <div className="gallery-admin-info">
                                    <div>
                                        <span>{item.title}</span><br />
                                        <small>{item.category}</small>
                                    </div>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>🗑️</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {isModalOpen && (
                <>
                    <div className="modal-overlay active" onClick={() => setIsModalOpen(false)}></div>
                    <div className="admin-modal active">
                        <div className="modal-header">
                            <h3>Upload Photo</h3>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpload}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category">
                                    <option value="exterior">Exterior</option>
                                    <option value="indoor">Indoor</option>
                                    <option value="outdoor">Outdoor</option>
                                    <option value="parking">Parking</option>
                                    <option value="food">Food</option>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="restroom">Restroom</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Photo *</label>
                                <input type="file" name="image" accept="image/*" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminGallery;
