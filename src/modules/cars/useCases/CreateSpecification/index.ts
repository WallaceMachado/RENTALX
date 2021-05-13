import { SpecificationRepository } from "../../repositories/SpecificationRepository";

import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const SpecificationsRepository = SpecificationRepository.getINSTANCE();

const createSpecificationUseCase = new CreateSpecificationUseCase(SpecificationsRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };