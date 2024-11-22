import { createTaskUseCase } from '../../../application/useCases/task/CreateTaskUseCase';

describe('CreateTaskUseCase', () => {
  it('Lanzar un error si falta el título', async () => {
    const taskInput = {
      title: '',
      description: 'Descripción sin título',
    };

    await expect(createTaskUseCase.execute(taskInput.title, taskInput.description)).rejects.toThrow(
      'Title is required'
    );
  });
});
