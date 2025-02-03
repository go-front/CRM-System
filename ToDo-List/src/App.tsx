import { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput/TaskInput';
import StateFilter from './components/StateFilter/StateFilter';
import TasksList from './components/TaskList/TaskList';
import { fetchTasks } from './http';
import { IFilterCounts } from './components/types/types';
import EmptyBox from './components/EmptyBox/EmptyBox';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filterCounts, setFilterCounts] = useState<IFilterCounts>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTasks(filter).then(({ data, info }) => {
      setTasks(data);
      setFilterCounts(info);
      setIsLoading(false);
    });
  }, [filter]);

  const handleRefreshTasks = async () => {
    const { data, info } = await fetchTasks(filter);
    setTasks(data);
    setFilterCounts(info);
  };

  const handleFilterChanges = (newFilter: string) => {
    if (filter !== newFilter) {
      setFilter(newFilter);
    }
  };
  return (
    <>
      <TaskInput onAddTask={handleRefreshTasks} />
      <StateFilter
        onFilterChange={handleFilterChanges}
        filterCounts={filterCounts}
      />
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <TasksList
          setFilterCounts={setFilterCounts}
          tasks={tasks}
          refreshTasks={() => handleRefreshTasks()}
        />
      ) : (
        <EmptyBox />
      )}
    </>
  );
}

export default App;
