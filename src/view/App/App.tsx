import { FC } from "react";
import styles from "./App.module.scss";
import { useToDoStore } from "../../data/stores/useToDoStore.ts";
import { InputPlus } from "../components/InputPlus/InputPlus.tsx";
import { InputTask } from "../components/InputTask/InputTask.tsx";

export const App: FC = () => {
  const { tasks, createTask, removeTask, updateTask } = useToDoStore(
    (state) => state,
  );
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title.trim()) createTask(title);
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};
