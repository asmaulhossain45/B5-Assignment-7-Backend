import { CloudinaryStorage } from "multer-storage-cloudinary";

import multer from "multer";
import { cloudinaryUpload } from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const baseName = file.originalname
        .toLowerCase()
        .replace(/\.[^/.]+$/, "")
        .replace(/[.\s]+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      console.log("image uploaded");
      return `${baseName}-${uniqueSuffix}`;
    },
  },
});

export const multerUpload = multer({ storage });
