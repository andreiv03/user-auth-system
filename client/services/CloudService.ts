import axios from "./AxiosSettings";
import { MessageResponseInterface } from "../interfaces/AxiosInterfaces";

class CloudService {
  // APIs
  uploadAvatar(token: string, id: string, file: FormData) {
    return axios.patch<MessageResponseInterface>(`/upload-avatar/${id}`, file, {
      headers: { Authorization: token }
    });
  }
}

export default new CloudService();