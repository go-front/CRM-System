import TaskItem from './components/TaskItem';
import { ITasksListProps } from '../types/types';

export default function TasksList({ tasks, refreshTasks }: ITasksListProps) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} />
      ))}
    </ul>
  );
}
