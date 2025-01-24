import { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput/TaskInput";
import StateFilter from "./components/StateFilter/StateFilter";
import TasksList from "./components/TaskList/TaskList";
import { newTasks, fetchTasks } from "./http";
import { IFilterCounts } from "./components/types/types";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterCounts, setFilterCounts] = useState<IFilterCounts>({
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

  const handleRefreshTasks = async () => {
    const { data, info } = await fetchTasks(filter);
    setTasks(data);
    setFilterCounts(info);
  };

  const handleAddTask = async (taskTitle: string) => {
    try {
      await newTasks(taskTitle);
      fetchTasks(filter).then(({ data, info }) => {
        setTasks(data);
        setFilterCounts(info);
      });
    } catch (error) {
      console.error("Ошибка добавления задачи:", error);
    }
  };
  // const handleSaveTask = (updatedTask) => {
  //   updateTask(updatedTask).then(() => {
  //     fetchTasks(filter).then(({ data, info }) => {
  //       setTasks(data);
  //       setFilterCounts(info);
  //     });
  //   });
  // };

  const handleFilterChanges = (newFilter: string) => {
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
          refreshTasks={() => handleRefreshTasks()}
        />
      ) : (
        <p>Loading tasks...</p>
      )}
    </>
  );
}

export default App;
