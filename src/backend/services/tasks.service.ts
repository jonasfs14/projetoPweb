import { TaskRepository, Task } from '../repositories/task.repository';
import { CreateTaskDto } from '../repositories/dto/create-task.dto';

export class TasksService {
  private repository = new TaskRepository();

  async listarTodas(status?: string): Promise<Task[]> {
    return this.repository.findAll(status);
  }

  async criarNova(dto: CreateTaskDto): Promise<Task> {
    return this.repository.create(dto);
  }
}