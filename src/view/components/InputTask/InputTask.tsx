import { FC, useEffect, useRef, useState } from "react";

import styles from "./InputTask.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [value, setValue] = useState(title);

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          disabled={isEditMode}
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked);
            if (event.target.checked) {
              onDone(id);
            }
          }}
          className={styles.inputTaskCheckbox}
        />
        {isEditMode ? (
          <input
            ref={editRef}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={styles.inputTaskEditTitle}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure ?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
