import axios from "./AxiosSettings";
import { GoogleDriveUploadInterface } from "../interfaces/APIs";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class APIs {
  googleDriveUpload(token: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post<GoogleDriveUploadInterface>("/google-drive/upload", formData, {
      headers: { "content-type": "multipart/form-data", Authorization: token }
    });
  }

  googleDriveDelete(token:string, fileId: string) {
    return axios.post<MessageResponseInterface>("/google-drive/delete", { fileId }, {
      headers: { Authorization: token }
    });
  }
}

export default new APIs();