import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
    '/',
    ensureAuthenticated,
    //ensureAdmin,
    createCarController.handle
);
export { carsRoutes }