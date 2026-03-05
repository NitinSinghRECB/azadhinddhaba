import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('ahd_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Toast notification state
    const [toast, setToast] = useState(null);

    useEffect(() => {
        localStorage.setItem('ahd_cart', JSON.stringify(cart));
    }, [cart]);

    const showToast = useCallback((itemName) => {
        setToast(itemName);
        setTimeout(() => setToast(null), 2200);
    }, []);

    const addToCart = (item, quantity = 1, type = 'full') => {
        setCart(prev => {
            const existing = prev.find(i => i._id === item._id && i.type === type);
            if (existing) {
                return prev.map(i =>
                    i._id === item._id && i.type === type
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, {
                _id: item._id,
                name: item.name,
                price: type === 'half' ? item.priceHalf : (item.priceFull || item.price),
                type,
                quantity,
                isVeg: item.isVeg
            }];
        });
        showToast(item.name);
    };

    const updateQuantity = (id, type, change) => {
        setCart(prev => prev.map(item => {
            if (item._id === id && item.type === type) {
                const newQ = item.quantity + change;
                return newQ > 0 ? { ...item, quantity: newQ } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            toast
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
