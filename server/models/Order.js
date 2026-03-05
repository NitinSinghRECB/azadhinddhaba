const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    variant: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentId: { type: String, default: '' },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    notes: { type: String, default: '' }
}, { timestamps: true });

orderSchema.pre('save', async function (next) {
    if (!this.orderId) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderId = 'AHD' + String(count + 1001).padStart(5, '0');
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
