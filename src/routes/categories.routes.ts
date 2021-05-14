import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
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
  const { file } = request;

  console.log(file);
  return respose.send();
});

export { categoriesRoutes };