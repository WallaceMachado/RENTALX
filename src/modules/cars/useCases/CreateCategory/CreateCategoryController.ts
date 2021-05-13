import { Request, Response } from "express";

//import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase){

  }
  handle(request: Request, response: Response): Response{
    const { name, description } = request.body;

    this.createCategoryUseCase.excute({name,description})
  
    return response.status(201).send();
  }
}

export {  CreateCategoryController }