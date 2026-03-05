import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { API_URL, getImageUrl } from '../../api';

const categoryEmojis = {
    'Breakfast & Snacks': '☕',
    'Burger & Sandwich': '🍔',
    'Momos': '🥟',
    'Main Course (Paneer)': '🥘',
    'Mushroom & Soya': '🍄',
    'Dal & Rice': '🍚',
    'Fried Rice & Noodles': '🍜',
    'Breads (Roti & Naan)': '🫓',
    'Chinese Starters': '🥢',
    'Beverages': '🥤'
};

const MenuSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all, veg, nonveg
    const [category, setCategory] = useState('all');

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${API_URL}/menu`)
            .then(res => res.json())
            .then(data => {
                setItems(data.filter(i => i.available));
                setLoading(false);
            })
            .catch(err => {
                console.error('Menu load error:', err);
                setLoading(false);
            });
    }, []);

    const categories = ['all', ...new Set(items.map(i => i.category))];

    const filteredItems = items.filter(item => {
        if (category !== 'all' && item.category !== category) return false;
        if (filter === 'veg' && !item.isVeg) return false;
        if (filter === 'nonveg' && item.isVeg) return false;
        if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <section className="menu-section" id="menu">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Our Menu</span>
                    <h2 className="section-title">Fresh, Hot & <span className="accent">Delicious</span></h2>
                    <p className="section-desc">From our famous parathas to sizzling tandoori items, everything is prepared fresh with authentic spices.</p>
                </div>

                <div className="menu-controls reveal">
                    <div className="menu-search">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="menu-filter-btns">
                        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button className={`filter-btn ${filter === 'veg' ? 'active' : ''}`} onClick={() => setFilter('veg')}>🟢 Veg</button>
                        <button className={`filter-btn ${filter === 'nonveg' ? 'active' : ''}`} onClick={() => setFilter('nonveg')}>🔴 Non-Veg</button>
                    </div>
                </div>

                <div className="menu-categories reveal">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`cat-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat === 'all' ? '🍽️ All Items' : `${categoryEmojis[cat] || '🍛'} ${cat}`}
                        </button>
                    ))}
                </div>

                <div className="menu-grid">
                    {loading ? (
                        <div className="menu-loading">Loading menu exactly as it is fresh... 🍳</div>
                    ) : filteredItems.length === 0 ? (
                        <div className="menu-loading">No items found matching your filters.</div>
                    ) : (
                        filteredItems.map(item => (
                            <FoodCard key={item._id} item={item} onAdd={addToCart} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

const FoodCard = ({ item, onAdd }) => {
    const [selectedVariant, setSelectedVariant] = useState(item.priceHalf ? 'half' : 'full');

    const handleAdd = () => {
        onAdd(item, 1, selectedVariant);
    };

    return (
        <div className={`menu-card reveal ${!item.available ? 'unavailable-card' : ''}`}>
            {!item.available && <div className="unavailable-tag">Out of Stock</div>}
            {item.image && (
                <div className="menu-card-image">
                    <img src={getImageUrl(item.image)} alt={item.name} loading="lazy" />
                    <div className={`veg-badge ${item.isVeg ? 'veg' : 'nonveg'}`}>
                        {item.isVeg ? '🟢' : '🔴'}
                    </div>
                    {item.popular && <div className="popular-tag">Popular</div>}
                </div>
            )}
            <div className="menu-card-body">
                <h3 className="menu-card-name">{item.name}</h3>
                <p className="menu-card-category">{item.category}</p>

                {item.priceHalf && item.priceFull ? (
                    <div className="menu-card-variants">
                        <button
                            className={`variant-btn ${selectedVariant === 'half' ? 'active' : ''}`}
                            onClick={() => setSelectedVariant('half')}
                        >
                            Half: ₹{item.priceHalf}
                        </button>
                        <button
                            className={`variant-btn ${selectedVariant === 'full' ? 'active' : ''}`}
                            onClick={() => setSelectedVariant('full')}
                        >
                            Full: ₹{item.priceFull}
                        </button>
                    </div>
                ) : (
                    <div style={{ height: '34px' }}></div> // Spacer
                )}

                <div className="menu-card-footer">
                    <div className="menu-card-price">
                        ₹{selectedVariant === 'half' ? item.priceHalf : (item.priceFull || item.price)}
                    </div>
                    <button className="add-btn" onClick={handleAdd} disabled={!item.available}>
                        ✚ Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuSection;
