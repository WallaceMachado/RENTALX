import { Request, Response } from "express";
import { container } from "tsyringe";

//import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    //injeção de dependencia com tsyringe
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.excute({ name, description })

    return response.status(201).send();
  }
}

export { CreateCategoryController }