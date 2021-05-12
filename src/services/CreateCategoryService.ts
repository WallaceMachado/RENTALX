
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest{
  name: string;
  description: string;
}
class CreateCategoryService {

  constructor(private categoriesRepository: ICategoriesRepository){

  }
  excute({ description, name }: IRequest): void{
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    throw new Error('category already exists!');
  }

  this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService }