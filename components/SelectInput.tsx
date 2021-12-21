import { useState } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";

interface Props {
  styles: {
    readonly [key: string]: string;
  },
  options: Array<any>;
  name: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const SelectInput: React.FC<Props> = ({ styles, options, name, value, setState }) => {
  const [isActive, setIsActive] = useState(false);

  const handleItemChange = (option: string) => {
    setIsActive(false);
    setState((prevState: any) => ({
      ...prevState,
      [name]: option
    }));
  }

  return (
    <div className={styles.field}>
      <input type="text" id={name} name={name} placeholder=" " value={value} readOnly
        className={isActive ? styles.active : ""} onClick={() => setIsActive(!isActive)} />
      <label htmlFor="parent">Parent category</label>
      <div className={styles.remove_button} onClick={() => handleItemChange("")}>{value ? <RiDeleteBack2Fill /> : ""}</div>

      {isActive && (
        <div className={styles.select_items}>
          {options.map(option => (
            <div key={option.name} className={styles.select_item} onClick={() => handleItemChange(option.name)}>{option.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectInput;