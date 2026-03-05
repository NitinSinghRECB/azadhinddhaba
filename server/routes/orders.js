const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// POST create order (public)
router.post('/', async (req, res) => {
    try {
        const { customerName, phone, address, items, subtotal, deliveryCharge, total, paymentId, notes } = req.body;
        if (!customerName || !phone || !address || !items || items.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const order = new Order({
            customerName, phone, address, items,
            subtotal: Number(subtotal),
            deliveryCharge: Number(deliveryCharge) || 0,
            total: Number(total),
            paymentId: paymentId || '',
            paymentStatus: paymentId ? 'completed' : 'pending',
            status: paymentId ? 'confirmed' : 'pending',
            notes: notes || ''
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all orders (admin)
router.get('/', auth, async (req, res) => {
    try {
        const { status, page = 1, limit = 50 } = req.query;
        const filter = {};
        if (status) filter.status = status;
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Order.countDocuments(filter);
        res.json({ orders, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single order (admin)
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH update order status (admin)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST verify payment
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
        // In production, verify the signature using Razorpay SDK
        // For now, just mark the order as paid
        if (orderId) {
            await Order.findByIdAndUpdate(orderId, {
                paymentId: razorpay_payment_id || 'demo_payment',
                paymentStatus: 'completed',
                status: 'confirmed'
            });
        }
        res.json({ success: true, message: 'Payment verified' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET order stats (admin)
router.get('/stats/summary', auth, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayOrders = await Order.countDocuments({ createdAt: { $gte: todayStart } });
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const totalRevenue = await Order.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const todayRevenue = await Order.aggregate([
            { $match: { paymentStatus: 'completed', createdAt: { $gte: todayStart } } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        res.json({
            totalOrders,
            todayOrders,
            pendingOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            todayRevenue: todayRevenue[0]?.total || 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE all orders (admin) - Clear history
router.delete('/', auth, async (req, res) => {
    try {
        await Order.deleteMany({});
        res.json({ message: 'All orders cleared successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
