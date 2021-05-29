import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController

//path inicial da rota está no server
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes }
