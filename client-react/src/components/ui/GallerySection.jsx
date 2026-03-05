import React, { useState, useEffect } from 'react';
import { API_URL, getImageUrl } from '../../api';

const GallerySection = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/gallery`)
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(console.error);
    }, []);

    const categories = ['all', ...new Set(items.map(i => i.category))];
    const filteredItems = items.filter(i => filter === 'all' || i.category === filter);

    return (
        <>
            <section className="gallery-section" id="gallery">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Gallery</span>
                        <h2 className="section-title">The Azad Hind <span className="accent">Vibe</span></h2>
                        <p className="section-desc">Take a visual tour of our restaurant, the lively atmosphere, and our mouth-watering dishes.</p>
                    </div>

                    <div className="gallery-tabs reveal">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`gallery-tab ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-grid reveal" id="galleryGrid">
                        {items.length === 0 ? (
                            <div className="gallery-placeholder">
                                <p>📸 Photos coming soon! Visit us to experience the real dhaba vibes.</p>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="gallery-placeholder">
                                <p>📸 No photos in this category yet.</p>
                            </div>
                        ) : (
                            filteredItems.map(item => (
                                <div
                                    key={item._id}
                                    className="gallery-item"
                                    onClick={() => setLightbox(item)}
                                >
                                    <img src={getImageUrl(item.image)} alt={item.title} loading="lazy" />
                                    <div className="gallery-item-overlay">
                                        <span className="gallery-item-title">{item.title}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightbox && (
                <div
                    className="lightbox"
                    style={{
                        position: 'fixed', inset: 0, zIndex: 5000,
                        background: 'rgba(0,0,0,0.9)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '20px'
                    }}
                    onClick={() => setLightbox(null)}
                >
                    <img
                        src={getImageUrl(lightbox.image)}
                        alt={lightbox.title}
                        style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                    />
                    <button style={{
                        position: 'absolute', top: '20px', right: '20px', color: 'white',
                        fontSize: '2rem', background: 'rgba(255,255,255,0.1)', width: '44px', height: '44px',
                        borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                    }}>&times;</button>
                </div>
            )}
        </>
    );
};

export default GallerySection;
