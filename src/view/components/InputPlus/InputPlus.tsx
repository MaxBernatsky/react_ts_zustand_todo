import { FC, useCallback, useState } from "react";

import styles from "./InputPlus.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") addTask();
        }}
        className={styles.inputPlusValue}
        placeholder="Type here..."
      />
      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  );
};
