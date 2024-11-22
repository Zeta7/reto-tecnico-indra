import { TaskRepository } from "../../ports/TaskRepository";
import { Task } from "../../../domain/entities/Task";
import { taskRepository } from "../../../infrastructure/repositories/DynamoTaskRepository";

class CreateTaskUseCase {
  constructor(private taskRep: TaskRepository) { };

  async execute(title: string, description: string): Promise<Task | any> {
    const task = new Task(title, description);
    const createTask = await this.taskRep.create(task);
    return createTask;
  };
};

export const createTaskUseCase = new CreateTaskUseCase(taskRepository); 