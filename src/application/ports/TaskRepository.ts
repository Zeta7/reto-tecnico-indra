import { Task } from '../../domain/entities/Task';

export interface TaskRepository {
  getAll(): Promise<Task[] | null>;
  create(task: Task): Promise<void>;
  getById(id: string): Promise<Task | null>;
  update(id: string, task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}