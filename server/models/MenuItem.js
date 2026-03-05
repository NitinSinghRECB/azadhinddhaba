const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    priceLabel: { type: String, default: '' },
    priceHalf: { type: Number, default: null },
    priceFull: { type: Number, default: null },
    image: { type: String, default: '' },
    available: { type: Boolean, default: true },
    isVeg: { type: Boolean, default: true },
    popular: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
