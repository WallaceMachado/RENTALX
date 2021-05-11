

import { Category } from "../model/Category";

interface ICreateCategoryDTO{
  name: string;
  description: string;
}
class CategoriesRepository {

  private categories: Category[];

  constructor(){
    this.categories = [];
  }

  create({ description, name }: ICreateCategoryDTO): void {
     //new para que o contrutor seja chamado
  const category = new Category();

  //object.assing adiciona no objeto category, os parametros passados
  Object.assign(category, {
    name,
    description,
    created_at: new Date()
  });

  this.categories.push(category);
  }

}

export { CategoriesRepository }