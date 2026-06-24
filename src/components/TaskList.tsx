'use client';

import { Task } from '../types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
  if (isLoading) {
    return <div className="text-center py-10 text-blue-500 font-medium">Carregando tarefas...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className="text-center py-10 text-gray-500">Nenhuma tarefa encontrada.</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}