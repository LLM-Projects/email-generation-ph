// types/index.ts
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";

export type CustomCloudinaryUploadWidgetInfo = CloudinaryUploadWidgetInfo & {
  secure_url: string;
  public_id: string;
};
