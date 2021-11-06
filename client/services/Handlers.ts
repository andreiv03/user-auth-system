import { NextRouter } from "next/router";
import AuthService from "./AuthService";

class Handlers {
  async handleLogout(router: NextRouter, setToken: React.Dispatch<React.SetStateAction<string>>) {
    try {
      await AuthService.logout();
      setToken("");
      localStorage.removeItem("isLoggedIn");
      return router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  handleFormDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<any>>) {
    return setState((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  handleSelectInputChange(name: string, value: string, setState: React.Dispatch<React.SetStateAction<any>>) {
    return setState((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }

  handleFileUpload(event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) {
    if (!event.target.files || !event.target.files[0]) return;
    else if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") return setState({});
    return setState(event.target.files[0]);
  }
}

export default new Handlers();