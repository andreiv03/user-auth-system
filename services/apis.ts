import axios from "./axios";
import { MessageResponseInterface, GoogleDriveUploadInterface } from "../interfaces/interfaces";

class APIsClass {
  googleDriveUpload(token: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, file)

    // return axios.post<GoogleDriveUploadInterface>("/google-drive", formData, {
    //   headers: { "content-type": "multipart/form-data", Authorization: token }
    // });
  }

  googleDriveDelete(token:string, fileId: string) {
    return axios.post<MessageResponseInterface>("/google-drive", { fileId }, {
      headers: { Authorization: token }
    });
  }
}

const APIs = new APIsClass();

export default APIs;