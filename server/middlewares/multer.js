import multer from "multer";

const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5  // 5MB limit
    }
});

const singleAvatar= multerUpload.single('avatar')  // single('avatar') means we are expecting a single file

export {singleAvatar}