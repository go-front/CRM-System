import { useState } from "react";
import styles from "./TaskInput.module.css";

type TProps = {
  onAddTask: (target: string) => void;
};

export default function TaskInput({ onAddTask }: TProps) {
  const [inputTask, setInputTask] = useState<string>("");

  const handleAddTask = () => {
    if (
      inputTask.trim() === "" ||
      inputTask.length < 2 ||
      inputTask.length > 64
    ) {
      alert(
        "Введенный текст не соостветствует требованиям добавления задачи: поле не должно быть пустым, текст должен содержать от 2 до 64 символов. Повторите добавление задачи"
      );
      setInputTask("");
    } else {
      onAddTask(inputTask);
      setInputTask("");
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Task to be done..."
        className={styles.input}
        value={inputTask}
        onChange={(event) => setInputTask(event.target.value)}
      />
      <button type="submit" className={styles.button} onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}
