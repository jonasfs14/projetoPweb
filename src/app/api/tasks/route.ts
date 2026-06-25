import { NextResponse } from 'next/server';
import { TasksService } from '../../../backend/services/tasks.service';
import { validateCreateTaskDto } from '../../../backend/repositories/dto/create-task.dto';
const tasksService = new TasksService();

// Endpoint GET - Buscar tarefas
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  
  const tasks = await tasksService.listarTodas(status);
  return NextResponse.json(tasks);
}

// Endpoint POST - Criar tarefas com validação rigorosa (DTO)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validação Rigorosa
    const errors = validateCreateTaskDto(body);
    if (errors.length > 0) {
      return NextResponse.json({ message: 'Falha na validação', errors }, { status: 400 });
    }

    const newTask = await tasksService.criarNova(body);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}