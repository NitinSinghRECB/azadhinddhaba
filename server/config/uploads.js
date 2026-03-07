const fs = require('fs');
const path = require('path');

const LEGACY_UPLOAD_DIR = path.resolve(__dirname, '..', 'uploads');
const DEFAULT_UPLOAD_DIR = path.resolve(__dirname, '..', 'storage', 'uploads');

const resolveUploadDir = () => {
    const configuredPath = (process.env.UPLOAD_DIR || '').trim();
    if (!configuredPath) return DEFAULT_UPLOAD_DIR;
    if (path.isAbsolute(configuredPath)) return configuredPath;
    return path.resolve(__dirname, '..', configuredPath);
};

const uploadDir = resolveUploadDir();

const ensureDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const migrateLegacyUploads = () => {
    if (uploadDir === LEGACY_UPLOAD_DIR) return;
    if (!fs.existsSync(LEGACY_UPLOAD_DIR)) return;

    const entries = fs.readdirSync(LEGACY_UPLOAD_DIR, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isFile()) continue;

        const sourcePath = path.join(LEGACY_UPLOAD_DIR, entry.name);
        const targetPath = path.join(uploadDir, entry.name);

        if (!fs.existsSync(targetPath)) {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
};

ensureDirectory(uploadDir);
migrateLegacyUploads();

const toPublicUploadPath = (filename) => `/uploads/${filename}`;

const resolveStoredUploadPath = (storedPath) => {
    if (!storedPath || typeof storedPath !== 'string') return null;
    const normalized = storedPath.replace(/\\/g, '/').trim();

    if (normalized.startsWith('/uploads/') || normalized.startsWith('uploads/')) {
        return path.join(uploadDir, path.basename(normalized));
    }

    if (path.isAbsolute(storedPath)) {
        return storedPath;
    }

    return path.join(uploadDir, path.basename(normalized));
};

module.exports = {
    uploadDir,
    toPublicUploadPath,
    resolveStoredUploadPath
};
