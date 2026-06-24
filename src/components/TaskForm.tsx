'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

const taskSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(5, 'A descrição deve ter pelo menos 5 caracteres'),
  status: z.enum(['Pendente', 'Em Progresso', 'Concluído']),
});

type TaskFormData = z.infer<typeof taskSchema>;

export function TaskForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { status: 'Pendente' }
  });

  const onSubmit = (data: TaskFormData) => {
    console.log('Dados enviados:', data);
    toast.success('Tarefa criada com sucesso! (Dados Mocados)');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nova Tarefa</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input {...register('title')} className="mt-1 block w-full rounded-md border-gray-300 p-2 border focus:ring-blue-500 focus:border-blue-500 text-sm" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 p-2 border focus:ring-blue-500 focus:border-blue-500 text-sm" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300 p-2 border bg-white text-sm">
          <option value="Pendente">Pendente</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition font-medium text-sm">
        Adicionar Tarefa
      </button>
    </form>
  );
}