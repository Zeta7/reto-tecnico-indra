import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../ports/TaskRepository";
import { taskRepository } from '../../../infrastructure/repositories/DynamoTaskRepository';

class GetAllTaskUseCase {
  constructor(private taskRep: TaskRepository) { };

  async execute(): Promise<Task[]> {
    return await this.taskRep.getAll();
  };
};

export const getAllTaskUseCase = new GetAllTaskUseCase(taskRepository);