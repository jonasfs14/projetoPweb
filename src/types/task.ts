export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pendente' | 'Em Progresso' | 'Concluído';
  createdAt: string;
}