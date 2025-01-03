import styles from './TasksList.module.css';
import { deleteTasks, updateTask } from '../http';
import { useState } from 'react';

export default function TasksList({ tasks, setFilterCounts, refreshTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [preEditing, setPreEditing] = useState(editText);

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

  const editTask = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.title);
    setPreEditing(task.title);
  };

  const handleSaveEdit = async (taskId) => {
    if (!editText.trim()) {
      alert('Текст задачи не может быть пустым!');
      return;
    }

    const updatedTask = {
      ...tasks.find((task) => task.id === taskId),
      title: editText,
    };
    try {
      const updatedFromServer = await updateTask(updatedTask);
      if (updatedFromServer) {
        setEditingTaskId(null);
        setEditText('');
        refreshTasks();
      }
    } catch (error) {
      console.error('Ошибка при обновлении текста задачи:', error);
    }
  };

  const handleEditText = (e) => {
    setEditText(e.target.value);
  };
  const handleKeyDown = (e, taskId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(taskId);
    }
  };

  const handleCancelEdit = (e) => {
    setEditText(setPreEditing);
    setEditingTaskId(null);
  };
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }
  return (
    <ul>
      {tasks.map((task) => {
        const isEditing = editingTaskId === task.id;
        return (
          <li key={task.id} className={styles.task_style}>
            <input
              type="checkbox"
              id={`checkbox-${task.id}`}
              checked={task.isDone}
              onChange={() => handleChangeCheckbox(task.id)}
              className={styles.checkbox}
            />
            <label htmlFor={`checkbox-${task.id}`}></label>
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={handleEditText}
                onKeyDown={(e) => {
                  handleKeyDown(e, task.id);
                }}
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
                  onClick={() => handleSaveEdit(task.id)}
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className={styles.cancle_button}
                  onClick={(e) => handleCancelEdit()}
                >
                  CANCEL
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className={styles.edit_button}
                  onClick={() => editTask(task)}
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
            )}
          </li>
        );
      })}
    </ul>
  );
}
