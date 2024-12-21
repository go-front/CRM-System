import styles from './TasksList.module.css';
import { useState, useEffect } from 'react';
import { deleteTasks, updateTask } from '../http';

export default function TasksList({ tasks, onEdit, setFilterCounts }) {
  const [tasksState, setTasksState] = useState(tasks);

  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  const handleChangeCheckbox = async (id) => {
    const taskToUpdate = tasksState.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, isDone: !taskToUpdate.isDone };

    try {
      const updatedFromServer = await updateTask(updatedTask);

      if (updatedFromServer) {
        const updatedTasks = tasksState.map((task) =>
          task.id === id ? updatedFromServer : task,
        );

        setTasksState(updatedTasks);
        setFilterCounts(updatedTasks);
      }
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTasks(taskId).then(() => {
      const updatedTasks = tasksState.filter((task) => task.id !== taskId);
      setTasksState(updatedTasks);
      setFilterCounts(updatedTasks);
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
            id="checkbox"
            checked={task.isDone}
            onChange={() => handleChangeCheckbox(task.id)}
            className={styles.checkbox}
          />
          <label htmlFor="checkbox"></label>
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
