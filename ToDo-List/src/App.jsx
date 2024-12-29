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
      fetchTasks(filter).then(({ data, info }) => {
        setTasks(data);
        setFilterCounts(info);
      });
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };

  // const handleEditTask = (task) => {
  //   if (!task) return;
  //   setCurrentTask(task);
  //   setIsModalOpen(true);
  //   fetchTasks(filter).then(({ data, info }) => {
  //     setTasks(data);
  //   });
  // };
  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask).then(() => {
      fetchTasks(filter).then(({ data, info }) => {
        setTasks(data);
        setFilterCounts(info);
      });
    });
    // ЛОКАЛЬНОЕ ОБНОВЛЕНИЕ, МЕНЬШЕ НАГРУЗКИ НА СЕРВЕР
    //   setTasks((prevTasks) =>
    //     prevTasks.map((task) =>
    //       task.id === updatedTask.id ? updatedTask : task,
    //     ),
    //   );
    // });
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
        <TasksList
          setFilterCounts={setFilterCounts}
          tasks={tasks}
          refreshTasks={() => {
            fetchTasks(filter).then(({ data, info }) => {
              setTasks(data);
              setFilterCounts(info);
            });
          }}
        />
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
