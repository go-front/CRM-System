export interface IFilterCounts {
  all: number;
  completed: number;
  inWork: number;
}

export type TTasks = ITask[];

export interface ITask {
  id: number;
  title: string;
  value: string;
  isDone: boolean;
}

export type refreshTasks = () => void;

export interface ITasksListProps {
  tasks: TTasks;
  refreshTasks: refreshTasks;
}

export interface ITaskItemProps {
  task: ITask;
  refreshTasks: refreshTasks;
}
