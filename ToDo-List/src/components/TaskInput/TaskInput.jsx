import { useState } from 'react';
import styles from './TaskInput.module.css';

export default function TaskInput({ onAddTask }) {
  const [inputTask, setInputTask] = useState('');

  // const handleAddTask = () => {
  //   if (inputTask.trim() === '') {
  //     return;
  //   }
  //   try {
  //     newTasks(inputTask).then(() => {
  //       setTasks((prevState) => [
  //         ...prevState,
  //         { title: inputTask, isDone: false },
  //       ]);
  //     });
  //     setInputTask('');
  //   } catch (error) {
  //     console.error('Ошибка при добавлении задачи:', error.message);
  //   }
  // };
  const handleAddTask = () => {
    if (inputTask.trim() === '') {
      return;
    }
    onAddTask(inputTask);
    setInputTask('');
  };
  return (
    <>
      <div className={styles.header}>
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
    </>
  );
}