const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');
const { Readable } = require('stream');

const BUCKET_NAME = 'uploads';
let bucket;

const getBucket = () => {
    if (!mongoose.connection || !mongoose.connection.db) {
        throw new Error('MongoDB connection is not ready');
    }

    if (!bucket) {
        bucket = new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
    }

    return bucket;
};

const toObjectId = (id) => {
    if (!id) return null;
    if (id instanceof ObjectId) return id;
    if (typeof id !== 'string' || !ObjectId.isValid(id)) return null;
    return new ObjectId(id);
};

const saveBufferToGridFS = ({ buffer, filename, contentType, metadata = {} }) => {
    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
        throw new Error('A non-empty file buffer is required');
    }

    return new Promise((resolve, reject) => {
        const uploadStream = getBucket().openUploadStream(filename || `upload-${Date.now()}`, {
            contentType: contentType || 'application/octet-stream',
            metadata
        });

        uploadStream.on('error', reject);
        uploadStream.on('finish', () => resolve(uploadStream.id.toString()));

        Readable.from([buffer]).pipe(uploadStream);
    });
};

const findFileById = async (id) => {
    const objectId = toObjectId(id);
    if (!objectId) return null;

    const files = await getBucket().find({ _id: objectId }).limit(1).toArray();
    return files[0] || null;
};

const openDownloadStreamById = (id) => {
    const objectId = toObjectId(id);
    if (!objectId) return null;
    return getBucket().openDownloadStream(objectId);
};

const deleteFileFromGridFS = async (id) => {
    const objectId = toObjectId(id);
    if (!objectId) return false;

    try {
        await getBucket().delete(objectId);
        return true;
    } catch (err) {
        if (err && (err.code === 26 || /FileNotFound/i.test(err.message || ''))) {
            return false;
        }
        throw err;
    }
};

const buildGridFsPublicPath = (id) => `/api/uploads/${id}`;

const extractGridFsIdFromPath = (storedPath) => {
    if (!storedPath || typeof storedPath !== 'string') return null;
    const normalized = storedPath.replace(/\\/g, '/').trim();
    const match = normalized.match(/\/api\/uploads\/([a-f0-9]{24})(?:$|\?|#)/i);
    return match ? match[1] : null;
};

module.exports = {
    saveBufferToGridFS,
    findFileById,
    openDownloadStreamById,
    deleteFileFromGridFS,
    buildGridFsPublicPath,
    extractGridFsIdFromPath
};
