import { Router } from 'express';


import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';


const categoriesRoutes = Router();



//path inicial da rota está no server
categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.hangle(request, response);
});

export { categoriesRoutes };