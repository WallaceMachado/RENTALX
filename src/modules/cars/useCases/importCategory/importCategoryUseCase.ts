import { Request, Response } from "express";
import { ImportCategoryController } from "./importCategoryController";


class ImportCategoryUseCase {

 // constructor(private importCategoryController: ImportCategoryController){

//}
  excute({ file }: any){

    console.log(file);
 
  }

}

export { ImportCategoryUseCase }