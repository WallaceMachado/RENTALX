import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";


const specificationsRoutes = Router();

const specificationRepository = SpecificationRepository.getINSTANCE();

//path inicial da rota está no server
specificationsRoutes.post("/", (request, response) => {

  return createSpecificationController.handle(request, response);

});

specificationsRoutes.get("/", (request, response) => {

  const all = specificationRepository.list();

  return response.json(all);

});

export { specificationsRoutes }
