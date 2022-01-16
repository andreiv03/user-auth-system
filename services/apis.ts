import axios from "./axios";
import type { MessageResponseInterface, FileUploadInterface } from "../interfaces";

class APIsClass {
  googleDriveUpload(token: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post<FileUploadInterface>("/google-drive", formData, {
      headers: { "content-type": "multipart/form-data", Authorization: token }
    });
  }

  googleDriveDelete(token:string, fileId: string) {
    return axios.delete<MessageResponseInterface>(`/google-drive/${fileId}`, {
      headers: { Authorization: token }
    });
  }
}

const APIs = new APIsClass();
export default APIs;