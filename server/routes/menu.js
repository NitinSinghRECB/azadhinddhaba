const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { uploadDir, toPublicUploadPath } = require('../config/uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET all menu items (public)
router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (available !== undefined) filter.available = available === 'true';
        const items = await MenuItem.find(filter).sort({ category: 1, sortOrder: 1, name: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await MenuItem.distinct('category');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new menu item (admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.image = toPublicUploadPath(req.file.filename);
        if (data.price) data.price = Number(data.price);
        if (data.priceHalf) data.priceHalf = Number(data.priceHalf);
        if (data.priceFull) data.priceFull = Number(data.priceFull);
        if (data.sortOrder) data.sortOrder = Number(data.sortOrder);
        data.available = data.available !== 'false';
        data.isVeg = data.isVeg !== 'false';
        data.popular = data.popular === 'true';
        const item = new MenuItem(data);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update menu item (admin)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.image = toPublicUploadPath(req.file.filename);
        if (data.price) data.price = Number(data.price);
        if (data.priceHalf) data.priceHalf = Number(data.priceHalf) || null;
        if (data.priceFull) data.priceFull = Number(data.priceFull) || null;
        if (data.sortOrder) data.sortOrder = Number(data.sortOrder);
        if (data.available !== undefined) data.available = data.available !== 'false';
        if (data.isVeg !== undefined) data.isVeg = data.isVeg !== 'false';
        if (data.popular !== undefined) data.popular = data.popular === 'true';
        const item = await MenuItem.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE menu item (admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH toggle availability (admin)
router.patch('/:id/toggle', auth, async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        item.available = !item.available;
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
