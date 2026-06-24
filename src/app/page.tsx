'use client';

import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { CheckSquare } from 'lucide-react';

export default function Home() {
  const [filter, setFilter] = useState<string>('Todas');
  const { tasks, isLoading } = useTasks(filter);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-8 border-b pb-4">
        <CheckSquare className="text-blue-600" size={32} />
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">TaskDash</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TaskForm />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            {['Todas', 'Pendente', 'Em Progresso', 'Concluído'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                  filter === status ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <TaskList tasks={tasks} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}