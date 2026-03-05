const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: ['exterior', 'indoor', 'outdoor', 'parking', 'food', 'kitchen', 'restroom', 'other'],
        default: 'other'
    },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
