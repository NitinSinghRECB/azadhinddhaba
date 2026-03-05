const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    freeDeliveryRadius: { type: Number, default: 1 },
    deliveryChargePerKm: { type: Number, default: 10 },
    maxDeliveryRadius: { type: Number, default: 15 },
    whatsappNumber: { type: String, default: '919598181082' },
    isOpen: { type: Boolean, default: true },
    openTime: { type: String, default: '07:00' },
    closeTime: { type: String, default: '23:00' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
