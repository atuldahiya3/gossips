import { multer } from "multer";

export const multerUpload=multer({
    limit:{
        fileSize:1024*1024*5
    }
})