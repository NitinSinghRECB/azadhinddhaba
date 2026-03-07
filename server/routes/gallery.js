const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { uploadDir } = require('../config/uploads');
const { persistUploadedFile, removeStoredImage } = require('../config/imageStorage');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = 'gallery-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const cleanupImage = async (imagePath) => {
    try {
        await removeStoredImage(imagePath);
    } catch (cleanupErr) {
        console.error(`Image cleanup failed: ${cleanupErr.message}`);
    }
};

// GET all gallery items (public)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};
        if (category) filter.category = category;
        const items = await Gallery.find(filter).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST upload gallery image (admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Image is required' });

        const item = new Gallery({
            title: req.body.title || 'Untitled',
            category: req.body.category || 'other',
            image: await persistUploadedFile(req.file, 'gallery')
        });

        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE gallery item (admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Image not found' });

        await cleanupImage(item.image);

        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
