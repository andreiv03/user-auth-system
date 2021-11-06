import { useState } from "react";
import Handlers from "../services/Handlers";

interface Props {
  styles: {
    readonly [key: string]: string;
  },
  options: Array<any>;
  name: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const ComboBox: React.FC<Props> = ({ styles, options, name, value, setState }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = (optionName: string) => {
    Handlers.handleSelectInputChange(name, optionName, setState);
    setIsActive(false);
  }

  return (
    <div className={styles.select_container}>
      <div className={`${styles.select_input} ${!options.length ? styles.no_items : ""}`} id={name} onClick={() => options.length && setIsActive(!isActive)}>
        {value ? value : "Choose an option"}
      </div>
      <div className={`${styles.unselect} ${value ? styles.active : ""}`} onClick={() => handleClick("")} />

      {isActive && (
        <div className={styles.select_items}>
          {options.map(option => (
            <div key={option.name} className={styles.select_item} onClick={() => handleClick(option.name)}>{option.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComboBox;