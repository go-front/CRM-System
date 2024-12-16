import '../src/App.css';
import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import StateFilter from './components/StateFilter/StateFilter';
import TasksList from './components/TasksList/TasksList';
import { fetchTasks } from './components/http';
import { newTasks } from './components/http';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  const handleAddTask = async (taskTitle) => {
    const addedTask = await newTasks(taskTitle);
    console.log('Добавленная задача APP:', addedTask);
    if (addedTask) {
      setTasks((prevState) => [addedTask, ...prevState]);
    } else {
      console.log('Ошибка здесь');
    }
    // fetchTasks().then((data) => {
    //   console.log('Обновленный список задач:', data);
    //   setTasks(data);
    // });
  };

  return (
    <>
      <TaskInput onAddTask={handleAddTask} />
      <StateFilter />
      {tasks.length > 0 ? <TasksList tasks={tasks} /> : <p>Loading tasks...</p>}
    </>
  );
}

export default App;
