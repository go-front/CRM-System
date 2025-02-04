import { useState } from 'react';
import { updateTask, deleteTasks } from '../../../http';
import styles from './TaskItem.module.css';
import { ITaskItemProps, ITask } from '../../types/types';

export default function TaskItem({ task, refreshTasks }: ITaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleChangeCheckbox = async () => {
    const updatedTask = { ...task, isDone: !task.isDone };

    try {
      await updateTask(updatedTask);
      refreshTasks();
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTasks(task.id);
      refreshTasks();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      alert('Текст задачи не может быть пустым!');
      return;
    }

    const updatedTask: ITask = { ...task, title: editText };

    try {
      await updateTask(updatedTask);
      setIsEditing(false);
      refreshTasks();
    } catch (error) {
      console.error('Ошибка при обновлении текста задачи:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  return (
    <li key={task.id} className={styles.task_style}>
      <input
        type="checkbox"
        id={`checkbox-${task.id}`}
        checked={task.isDone}
        onChange={handleChangeCheckbox}
        className={styles.checkbox}
      />
      <label htmlFor={`checkbox-${task.id}`}></label>

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={`${task.isDone ? styles.complite : ''} ${styles.task_text}`}
        >
          {task.title}
        </span>
      )}

      {isEditing ? (
        <div>
          <button
            type="button"
            className={styles.save_button}
            onClick={handleSaveEdit}
          >
            SAVE
          </button>
          <button
            type="button"
            className={styles.cancle_button}
            onClick={() => setIsEditing(false)}
          >
            CANCEL
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className={styles.edit_button}
            onClick={() => setIsEditing(true)}
          >
            📝
          </button>
          <button
            type="button"
            className={styles.delete_button}
            onClick={handleDeleteTask}
          >
            🗑
          </button>
        </div>
      )}
    </li>
  );
}
