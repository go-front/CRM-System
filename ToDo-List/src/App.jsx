import '../src/App.css';
import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import StateFilter from './components/StateFilter/StateFilter';
import TasksList from './components/TasksList/TasksList';
import EditModalWindow from './components/EditModalWindow/EditModalWindow';
import { fetchTasks, newTasks, updateTask } from './components/http';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState();

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  const handleAddTask = async (taskTitle) => {
    try {
      const addedTask = await newTasks(taskTitle);
      console.log('Добавленная задача APP:', addedTask);
      fetchTasks().then((data) => {
        setTasks(data);
      });
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };

  const handleEditTask = (task) => {
    if (!task) return;
    setCurrentTask(task);
    setIsModalOpen(true);
  };
  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask).then(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );
    });
    setIsModalOpen(false);
  };
  return (
    <>
      <TaskInput onAddTask={handleAddTask} />
      <StateFilter />
      {tasks.length > 0 ? (
        <TasksList tasks={tasks} onEdit={handleEditTask} />
      ) : (
        <p>Loading tasks...</p>
      )}
      {isModalOpen && (
        <EditModalWindow
          task={currentTask}
          onSave={handleSaveTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
