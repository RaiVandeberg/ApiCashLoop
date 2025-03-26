import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAS_FOLDER = path.relative(TMP_FOLDER, "uploads");

// 1KB = 1024 bytes
// 1MB = 1024 * 1024 * X 
const MAX_SIZE = 3
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE // 3MB

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName)
        }
    })
}

export default{ 
    TMP_FOLDER, 
    UPLOAS_FOLDER, 
    MAX_FILE_SIZE, 
    ACCEPTED_IMAGE_TYPES, 
    MULTER,
    MAX_SIZE,
}