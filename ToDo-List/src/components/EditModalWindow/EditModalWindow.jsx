import styles from '../EditModalWindow/EditModalWindow.module.css';
import { useEffect, useState } from 'react';

export default function EditModalWindow({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleSave = () => {
    const updatedTask = { ...task, title };
    onSave(updatedTask);
  };
  return (
    <>
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <h2>Редактировать задачу:</h2>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className={styles.modal_close_btn}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
