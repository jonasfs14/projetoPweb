// Aplicando SOLID: Interface e Implementação (Repository Pattern)
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pendente' | 'Em Progresso' | 'Concluído';
  createdAt: string;
}

// Declaração correta da variável no objeto global do Node/Next.js
const globalForTasks = globalThis as unknown as { ThasTaskDatabase: Task[] };

if (!globalForTasks.ThasTaskDatabase) {
  globalForTasks.ThasTaskDatabase = [
    {
      id: '1',
      title: 'Estudar Next.js',
      description: 'Aprender rotas e APIs nativas',
      status: 'Em Progresso',
      createdAt: new Date().toISOString(),
    },
  ];
}

export class TaskRepository {
  async findAll(status?: string): Promise<Task[]> {
    const tasks = globalForTasks.ThasTaskDatabase;
    if (status && status !== 'Todas') {
      return tasks.filter(t => t.status === status);
    }
    return tasks;
  }

  async create(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      ...task,
    };
    globalForTasks.ThasTaskDatabase.push(newTask);
    return newTask;
  }
}