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
  const [filter, setFilter] = useState('all');
  const [filterCounts, setFilterCounts] = useState({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  useEffect(() => {
    fetchTasks(filter).then(({ data, info }) => {
      setTasks(data);
      setFilterCounts(info);
    });
  }, [filter]);

  const handleAddTask = async (taskTitle) => {
    try {
      const addedTask = await newTasks(taskTitle);
      fetchTasks(filter).then((data) => {
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

  const handleFilterChanges = (newFilter) => {
    if (filter !== newFilter) {
      setFilter(newFilter);
    }
  };
  return (
    <>
      <TaskInput onAddTask={handleAddTask} />
      <StateFilter
        onFilterChange={handleFilterChanges}
        filterCounts={filterCounts}
      />
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
