export interface CreateTaskDto {
  title: string;
  description: string;
  status: 'Pendente' | 'Em Progresso' | 'Concluído';
}

export function validateCreateTaskDto(data: any): string[] {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    errors.push('O título é obrigatório e deve ter pelo menos 3 caracteres.');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 5) {
    errors.push('A descrição é obrigatória e deve ter pelo menos 5 caracteres.');
  }

  const validStatus = ['Pendente', 'Em Progresso', 'Concluído'];
  if (!data.status || !validStatus.includes(data.status)) {
    errors.push('Status inválido. Escolha entre Pendente, Em Progresso ou Concluído.');
  }

  return errors;
}