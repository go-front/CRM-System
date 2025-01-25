import styles from "./TaskList.module.css";
import { deleteTasks, updateTask } from "../../http";
import { useState } from "react";
import { IFilterCounts } from "../types/types";

type TTasks = ITask[];
interface ITask {
  id: number;
  title: string;
  value: string;
  isDone: boolean;
}
type setFilterCounts = (target: IFilterCounts) => void;
type refreshTasks = () => void;

interface ITasksListProps {
  tasks: TTasks;
  setFilterCounts: setFilterCounts;
  refreshTasks: refreshTasks;
}

export default function TasksList({ tasks, refreshTasks }: ITasksListProps) {
  const [editingTaskId, setEditingTaskId] = useState<null | number>(null);
  const [editText, setEditText] = useState<null | string>("");
  const [preEditing, setPreEditing] = useState<string | null>(editText);
  const [, setFilterCounts] = useState<IFilterCounts>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const handleChangeCheckbox = async (id: number) => {
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
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
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
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const editTask = (task: ITask) => {
    setEditingTaskId(task.id);
    setEditText(task.title);
    setPreEditing(task.title);
  };
  const handleSaveEdit = async (taskId: number) => {
    if (!editText?.trim()) {
      alert("Текст задачи не может быть пустым!");
      return;
    }

    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      console.error("Задача не найдена");
      return;
    }
    const updatedTask: ITask = {
      ...taskToUpdate,
      title: editText,
    };
    try {
      const updatedFromServer = await updateTask(updatedTask);

      if (updatedFromServer) {
        setEditingTaskId(null);
        setEditText("");
        refreshTasks();
      }
    } catch (error) {
      console.error("Ошибка при обновлении текста задачи:", error);
    }
  };

  const handleEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    taskId: number
  ) => {
    if (e.key === "Enter") {
      handleSaveEdit(taskId);
    }
  };

  const handleCancelEdit = () => {
    setEditText(preEditing);
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
                value={editText ?? ""}
                onChange={handleEditText}
                onKeyDown={(e) => {
                  handleKeyDown(e, task.id);
                }}
              />
            ) : (
              <span
                className={`${task.isDone ? styles.complite : ""} ${
                  styles.task_text
                }`}
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
                  onClick={handleCancelEdit}
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
