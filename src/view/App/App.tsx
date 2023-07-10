import { FC } from "react";
import styles from "./App.module.scss";
import { useToDoStore } from "../../data/stores/useToDoStore.ts";

export const App: FC = () => {
  const { tasks, createTask, removeTask, updateTask } = useToDoStore(
    (state) => state,
  );
  console.log(tasks, createTask, removeTask, updateTask);
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}></section>
      <section className={styles.articleSection}></section>
    </article>
  );
};
