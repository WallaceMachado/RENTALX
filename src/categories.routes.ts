import { Router } from 'express';

import { CategoriesRepository } from './repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


//path inicial da rota está no server
categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  categoriesRepository.create({name, description});
 
  return response.status(201).send();
});

export { categoriesRoutes };