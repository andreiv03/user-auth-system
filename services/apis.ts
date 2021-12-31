import axios from "./axios";
import type { MessageResponseInterface, GoogleDriveUploadInterface } from "../interfaces";

class APIsClass {
  googleDriveUpload(token: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post<GoogleDriveUploadInterface>("/google-drive", formData, {
      headers: { "content-type": "multipart/form-data", Authorization: token }
    });
  }

  googleDriveDelete(token:string, fileId: string) {
    return axios.post<MessageResponseInterface>("/google-drive", { fileId }, {
      headers: { Authorization: token }
    });
  }
}

const APIs = new APIsClass();
export default APIs;