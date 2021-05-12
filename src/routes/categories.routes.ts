import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


//path inicial da rota está no server
categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.excute({name,description})

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {


  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };