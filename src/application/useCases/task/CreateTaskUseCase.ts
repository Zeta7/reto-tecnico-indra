import boom from '@hapi/boom';
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../ports/TaskRepository";
import { taskRepository } from "../../../infrastructure/repositories/DynamoTaskRepository";

class CreateTaskUseCase {
  constructor(private taskRep: TaskRepository) { };

  async execute(title: string, description: string): Promise<Task | any> {
    if (!title) throw boom.badRequest('Title is required');

    const task = new Task(title, description);
    const createTask = await this.taskRep.create(task);
    return createTask;
  };
};

export const createTaskUseCase = new CreateTaskUseCase(taskRepository); 