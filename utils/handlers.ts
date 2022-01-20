class HandlersClass {
  handleFormDataChange(name: string, value: string, setState: React.Dispatch<React.SetStateAction<any>>) {
    return setState((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }
}

const Handlers = new HandlersClass();
export default Handlers;