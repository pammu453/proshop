import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                // Multer error (e.g., file size exceeded)
                return res.status(400).json({ message: err.message });
            } else {
                // Other unexpected errors
                return res.status(500).json({ message: err.message });
            }
        }

        // Check if req.file is defined before accessing its properties
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    });
});

export default router