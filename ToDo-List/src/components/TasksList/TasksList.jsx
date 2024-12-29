import styles from './TasksList.module.css';
import { deleteTasks, updateTask } from '../http';

export default function TasksList({
  tasks,
  onEdit,
  setFilterCounts,
  refreshTasks,
}) {
  const handleChangeCheckbox = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, isDone: !taskToUpdate.isDone };

    try {
      const updatedFromServer = await updateTask(updatedTask);

      if (updatedFromServer) {
        setFilterCounts((prevCounts) => {
          return {
            ...prevCounts,
            completed: updatedTask.isDone
              ? prevCounts.completed + 1
              : prevCounts.completed - 1,
            inWork: updatedTask.isDone
              ? prevCounts.inWork - 1
              : prevCounts.inWork + 1,
          };
        });
      }
      refreshTasks();
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (!taskToDelete) return;
    try {
      await deleteTasks(taskId);

      setFilterCounts((prevCounts) => ({
        ...prevCounts,
        all: prevCounts.all - 1,
        completed: taskToDelete.isDone
          ? prevCounts.completed - 1
          : prevCounts.completed,
        inWork: taskToDelete.isDone ? prevCounts.inWork : prevCounts.inWork - 1,
      }));
      refreshTasks();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={styles.task_style}>
          <input
            type="checkbox"
            id={`checkbox-${task.id}`}
            checked={task.isDone}
            onChange={() => handleChangeCheckbox(task.id)}
            className={styles.checkbox}
          />
          <label htmlFor={`checkbox-${task.id}`}></label>
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
