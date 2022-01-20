import axios from "./axios";
import type { MessageResponseInterface, FileUploadInterface } from "../interfaces";

class CloudinaryServiceClass {
  upload(token: string, base64EncodedImage: string) {
    return axios.post<FileUploadInterface>("/cloudinary/upload", { base64EncodedImage }, {
      headers: { Authorization: token }
    });
  }

  delete(token:string, publicId: string) {
    return axios.post<MessageResponseInterface>("/cloudinary/delete", { publicId }, {
      headers: { Authorization: token }
    });
  }
}

const CloudinaryService = new CloudinaryServiceClass;
export default CloudinaryService;