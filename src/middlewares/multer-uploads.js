import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["application/pdf"]; // Solo acepta archivos PDF
const MAX_SIZE = 500000000; // Tamaño máximo permitido (500 MB)
const IMAGE_MIMETYPES = ["image/jpeg", "image/png", "image/gif"];


const createBufferConfig = (destinationFolder) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationFolder);
                req.filePath = fullPath;
                cb(null, fullPath);
            },
            filename: (req, file, cb) => {
                const fileExtension = extname(file.originalname);
                const fileName = file.originalname.split(fileExtension)[0];
                cb(null, `${fileName}-${Date.now()}${fileExtension}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) cb(null, true);
            else cb(new Error(`Solamente se aceptan archivos de tipo: ${MIMETYPES.join(", ")}`));
        },
        limits: {
            fileSize: MAX_SIZE,
        },
    });
};

const createMulterConfig = (destinationFolder) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationFolder)
                req.filePath = fullPath
                cb(null, fullPath)
            },
            filename: (req, file, cb) => {
                const fileExtension = extname(file.originalname)
                const fileName = file.originalname.split(fileExtension)[0]
                cb(null, `${fileName}-${Date.now()}${fileExtension}`)
            }   
        }),
        fileFilter:(req, file, cb) => {
            if(IMAGE_MIMETYPES.includes(file.mimetype)) cb(null,true)
            else cb(new Error(`Solamente se aceptan archivos de los siguients tipos: ${IMAGE_MIMETYPES.join(" ")}`))
        },
        limits:{
            fileSize: MAX_SIZE
        }
    })
}

export const uploadPDF = createBufferConfig("../../public/uploads/docs");
export const uploadImage = createMulterConfig("../../public/uploads/images");