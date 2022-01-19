class HandlersClass {
  handleFormDataChange(name: string, value: string, setState: React.Dispatch<React.SetStateAction<any>>) {
    setState((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }

  handleFileUpload(event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) {
    if (!event.target.files || !event.target.files[0]) return setState({} as File);
    if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") return setState({} as File);
    setState(event.target.files[0]);
  }
}

const Handlers = new HandlersClass();
export default Handlers;