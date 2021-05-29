import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';


const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

//path inicial da rota está no server
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
  console.log("reaload resolvidos");
  return listCategoryController.hangle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, respose) => {
  return importCategoryController.handle(request, respose);
});

export { categoriesRoutes };