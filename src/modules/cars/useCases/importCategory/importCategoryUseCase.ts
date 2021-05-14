import { Request, Response } from "express";
import { ImportCategoryController } from "./importCategoryController";


class ImportCategoryUseCase {

 // constructor(private importCategoryController: ImportCategoryController){

//}
  excute( file : Express.Multer.File): void
  {

    console.log(file);
 
  }

}

export { ImportCategoryUseCase }