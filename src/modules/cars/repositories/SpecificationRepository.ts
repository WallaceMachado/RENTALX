import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./implementations/ISpecificationRepository";



class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor(){
    this.specifications = [];
  }
  
  list(): Specification[] {
    const all = this.specifications
    return all;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

  //object.assing adiciona no objeto Specification, os parametros passados
  Object.assign(specification, {
    name,
    description,
    created_at: new Date()
  });

  this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

}

export { SpecificationRepository }