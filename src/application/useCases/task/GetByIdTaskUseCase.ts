import boom from '@hapi/boom';
import { TaskRepository } from "../../ports/TaskRepository";
import { Task } from "../../../domain/entities/Task";
import { taskRepository } from '../../../infrastructure/repositories/DynamoTaskRepository';

class GetByIdTaskUseCase {
  constructor(private taskRep: TaskRepository) {};

  async execute(id: string): Promise<Task | null | any> {
    const existingTask = await this.taskRep.getById(id);

    if (!existingTask) {
      throw boom.notFound("Task not found");
    }

    return existingTask;
  };
};

export const getByIdTaskUseCase = new GetByIdTaskUseCase(taskRepository);