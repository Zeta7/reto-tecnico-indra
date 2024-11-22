import { Response, Request, NextFunction } from 'express';
import { createTaskUseCase } from '../../../../application/useCases/task/CreateTaskUseCase';
import { taskRepository } from '../../../repositories/DynamoTaskRepository';
import { getAllTaskUseCase } from '../../../../application/useCases/task/GetAllTaskUseCase';
import { getByIdTaskUseCase } from '../../../../application/useCases/task/GetByIdTaskUseCase';
import { updateTaskUseCase } from '../../../../application/useCases/task/UpdateTaskUseCase';
import { deleteTaskUseCase } from '../../../../application/useCases/task/DeleteTaskUseCase';


class TaskController {
  public async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const rTasks = await getAllTaskUseCase.execute();

      res.status(200).json(rTasks);
    } catch (error) {
      next(error);
    };
  };

  public async getOneTask(req: Request, res: Response, next: NextFunction) {
    try {
      const rTask = await getByIdTaskUseCase.execute(req.params.id);

      if (!rTask) {
        res.status(404).send("Task not found");
      } else {
        res.json(rTask);
      };
    } catch (error) {
      next(error);
    };
  };

  public async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const rTask = await createTaskUseCase.execute(title, description);

      res.status(201).json(rTask);
    } catch (error) {
      next(error);
    };
  };

  public async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      await updateTaskUseCase.execute(req.params.id, title, description);

      res.send("Task updated");
    } catch (error) {
      next(error);
    };
  };

  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteTaskUseCase.execute(req.params.id);

      res.send("Task deleted");
    } catch (error) {
      next(error);
    };
  };
};

export default new TaskController();