import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../backend/repositores/task.repository';

// Função para buscar dados da API do Back-end
async function fetchTasks(status: string): Promise<Task[]> {
  const url = status && status !== 'Todas' ? `/api/tasks?status=${status}` : '/api/tasks';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar tarefas');
  return res.json();
}

// Função para enviar dados para a API do Back-end
async function createTask(newTask: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errors?.join(', ') || 'Erro ao criar tarefa');
  }
  return res.json();
}

export function useTasks(status: string = 'Todas') {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks', status],
    queryFn: () => fetchTasks(status),
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { tasks, isLoading, addTask: mutation.mutateAsync };
}