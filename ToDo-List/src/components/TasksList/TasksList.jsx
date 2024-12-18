import styles from './TasksList.module.css';
import { useState, useEffect } from 'react';
import { deleteTasks } from '../http';

export default function TasksList({ tasks, onEdit }) {
  const [tasksState, setTasksState] = useState(tasks);

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  const handleChangeCheckbox = (id) => {
    setTasksState((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    deleteTasks(taskId).then(() => {
      console.log(taskId);

      setTasksState((prevState) =>
        prevState.filter((task) => task.id !== taskId),
      );
    });
  };

  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }
  return (
    <ul>
      {tasksState.map((task) => (
        <li key={task.id} className={styles.task_style}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => handleChangeCheckbox(task.id)}
            className={styles.checkbox}
          />
          <span
            className={`${task.isDone ? styles.complite : ''} ${styles.task_text}`}
          >
            {task.title}
          </span>
          <div>
            <button
              type="button"
              className={styles.edit_button}
              onClick={() => onEdit(task)}
            >
              📝
            </button>
            <button
              type="button"
              className={styles.delete_button}
              onClick={() => handleDeleteTask(task.id)}
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
