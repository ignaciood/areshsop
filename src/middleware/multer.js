const path = require('path');

// Call Multer for image storage module
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/usersAvatars/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const uploadAvatar = multer({ storage: storage });

module.exports = uploadAvatar;