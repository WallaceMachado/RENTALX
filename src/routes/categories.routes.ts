import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';


const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();
//path inicial da rota está no server
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.hangle);

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };