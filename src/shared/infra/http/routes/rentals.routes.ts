import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAthenticated";


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
//const returnCarController = new returnCarController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
/*
rentalsRoutes.post(
  '/return/:id',
  ensureAuthenticated,
 // returnCarController.handle
);
*/
export { rentalsRoutes }