import boom from '@hapi/boom';
import { TaskRepository } from "../../ports/TaskRepository";
import { taskRepository } from '../../../infrastructure/repositories/DynamoTaskRepository';

class DeleteTaskUseCase {
  constructor(private taskRep: TaskRepository) { };

  async execute(id: string): Promise<void> {
    const existingTask = await this.taskRep.getById(id);
    if (!existingTask) {
      throw boom.notFound("Task not found");
    }
    await this.taskRep.delete(id);
  };
};

export const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);