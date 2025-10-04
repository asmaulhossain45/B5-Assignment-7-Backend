import { v2 as cloudinary } from "cloudinary";
import AppError from "../utils/appError";
import { envConfig } from "./envConfig";
import STATUS_CODE from "./statusCode";

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY.NAME,
  api_key: envConfig.CLOUDINARY.API_KEY,
  api_secret: envConfig.CLOUDINARY.SECRET_KEY,
});

export const cloudinaryUpload = cloudinary;

export const deleteCloudinaryImage = async (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    const parts = pathname.split("/");
    const fileWithExt = parts.slice(5).join("/");
    const publicId = fileWithExt.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new AppError(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Error deleting image from Cloudinary"
    );
  }
};
