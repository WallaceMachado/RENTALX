import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';


const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});


//path inicial da rota está no server
categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoryController.hangle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, respose) => {
 return importCategoryController.handle(request,respose);
});

export { categoriesRoutes };