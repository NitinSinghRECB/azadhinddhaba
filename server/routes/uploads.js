const express = require('express');
const router = express.Router();
const { findFileById, openDownloadStreamById } = require('../config/gridfs');

// GET image stored in MongoDB GridFS
router.get('/:id', async (req, res) => {
    try {
        const file = await findFileById(req.params.id);
        if (!file) return res.status(404).json({ message: 'Image not found' });

        res.set('Content-Type', file.contentType || 'application/octet-stream');
        res.set('Cache-Control', 'public, max-age=31536000, immutable');

        const downloadStream = openDownloadStreamById(file._id);
        if (!downloadStream) return res.status(404).json({ message: 'Image not found' });

        downloadStream.on('error', () => {
            if (!res.headersSent) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.end();
        });

        downloadStream.pipe(res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
