const fs = require('fs');
const { toPublicUploadPath, resolveStoredUploadPath } = require('./uploads');
const {
    saveBufferToGridFS,
    findFileById,
    buildGridFsPublicPath,
    extractGridFsIdFromPath,
    deleteFileFromGridFS
} = require('./gridfs');

const persistUploadedFile = async (file, source = 'upload') => {
    if (!file) return '';

    const diskPublicPath = toPublicUploadPath(file.filename);
    const buffer = fs.readFileSync(file.path);

    const gridFsId = await saveBufferToGridFS({
        buffer,
        filename: file.filename,
        contentType: file.mimetype,
        metadata: {
            source,
            originalname: file.originalname || '',
            diskPath: diskPublicPath
        }
    });

    return buildGridFsPublicPath(gridFsId);
};

const removeStoredImage = async (storedPath) => {
    if (!storedPath) return;

    const gridFsId = extractGridFsIdFromPath(storedPath);
    if (gridFsId) {
        const gridFile = await findFileById(gridFsId);
        await deleteFileFromGridFS(gridFsId);

        const diskPathFromMetadata = resolveStoredUploadPath(gridFile?.metadata?.diskPath);
        if (diskPathFromMetadata && fs.existsSync(diskPathFromMetadata)) {
            fs.unlinkSync(diskPathFromMetadata);
        }

        return;
    }

    const diskPath = resolveStoredUploadPath(storedPath);
    if (diskPath && fs.existsSync(diskPath)) {
        fs.unlinkSync(diskPath);
    }
};

module.exports = {
    persistUploadedFile,
    removeStoredImage
};
