import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAthenticated";

import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";



const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController

//specificationsRoutes.use(ensureAuthenticated);
//path inicial da rota está no server
specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle);

export { specificationsRoutes }
