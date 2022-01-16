class HandlersClass {
  handleFormDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<any>>) {
    return setState((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  handleFileUpload(event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) {
    if (!event.target.files || !event.target.files[0]) return setState({} as File);
    if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") return setState({} as File);
    return setState(event.target.files[0]);
  }
}

const Handlers = new HandlersClass();
export default Handlers;