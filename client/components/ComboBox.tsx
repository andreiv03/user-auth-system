import { useState } from "react";

interface Props {
  styles: {
    readonly [key: string]: string;
  },
  options: Array<any>;
  handler: (key: string) => void;
  value: string;
};

const ComboBox: React.FC<Props> = ({ styles, options, handler, value }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = (name: string) => {
    handler(name);
    setIsActive(false);
  }

  return (
    <div className={styles.select_container}>
      <div className={styles.select_input} id="category" onClick={() => setIsActive(!isActive)}>{value ? value : "Choose an option"}</div>
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