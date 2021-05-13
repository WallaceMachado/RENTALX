import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";


const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

//path inicial da rota está no server
specificationsRoutes.post("/", (request, response) => {

  const { name, description } = request.body;

  const createpecificartionService = new CreateSpecificationService(specificationRepository);

  createpecificartionService.excute({ name, description })

  return response.status(201).send();

});

specificationsRoutes.get("/", (request, response) => {

  const all = specificationRepository.list();

  return response.json(all);

});

export { specificationsRoutes }
