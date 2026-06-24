import { Task } from '../types/task';
import { Calendar } from 'lucide-react';

export function TaskCard({ task }: { task: Task }) {
  const statusStyles = {
    Pendente: 'bg-yellow-100 text-yellow-800',
    'Em Progresso': 'bg-blue-100 text-blue-800',
    Concluído: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{task.description}</p>
      <div className="flex items-center text-xs text-gray-400 gap-1">
        <Calendar size={14} />
        <span>{task.createdAt}</span>
      </div>
    </div>
  );
}