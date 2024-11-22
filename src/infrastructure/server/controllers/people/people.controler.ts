import { Response, Request, NextFunction } from 'express';
import { getDataPeopleUseCase } from '../../../../application/useCases/people/GetDataPeopleUseCase';

class PeopleController {
  public async getPeoples(req: Request, res: Response, next: NextFunction,) {
    try {
      const rPeoples = await getDataPeopleUseCase.execute();

      res.status(200).json(rPeoples);
    } catch (error) {
      next(error);
    };
  };
};

export default new PeopleController();