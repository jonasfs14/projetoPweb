import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Task } from '../types/task';

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Criar Repositório do GitHub', description: 'Configurar o projeto inicial para a equipe.', status: 'Concluído', createdAt: '2026-06-24' },
  { id: '2', title: 'Desenvolver o Front-end', description: 'Implementar os componentes e hooks do Next.js.', status: 'Em Progresso', createdAt: '2026-06-24' },
  { id: '3', title: 'Fazer Deploy na Vercel', description: 'Conectar o GitHub à Vercel para deploy automático.', status: 'Pendente', createdAt: '2026-06-24' },
];

export function useTasks(filterStatus?: string) {
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simula delay de rede
      return MOCK_TASKS;
    },
  });

  const filteredTasks = useMemo(() => {
    if (!filterStatus || filterStatus === 'Todas') return tasks;
    return tasks.filter((task) => task.status === filterStatus);
  }, [tasks, filterStatus]);

  return { tasks: filteredTasks, isLoading };
}