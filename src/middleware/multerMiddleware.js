const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = 'uploads/';

// Synchronously create the directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storageConfiguration = multer.diskStorage({ 
    destination: (req, file, next) => {
        next(null, uploadPath);
    },
    filename: (req, file, next) => {
        next(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploader = multer({ storage: storageConfiguration });

module.exports = uploader;