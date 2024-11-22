import boom from '@hapi/boom';
import { TaskRepository } from "../../ports/TaskRepository";
import { Task } from "../../../domain/entities/Task";
import { taskRepository } from '../../../infrastructure/repositories/DynamoTaskRepository';

class UpdateTaskUseCase {
  constructor(private taskRep: TaskRepository) {};

  async execute(id: string, title: string, description: string): Promise<void> {
    const existingTask = await this.taskRep.getById(id);

    if (!existingTask) {
      throw boom.notFound("Task not found");
    }

    const updatedTask = new Task(title, description);
    await this.taskRep.update(id, updatedTask);
  };
};

export const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);