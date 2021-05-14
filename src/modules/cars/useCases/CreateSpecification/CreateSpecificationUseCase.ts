
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest{
  name: string;
  description: string;
}

class CreateSpecificationUseCase {

  constructor(private specificationsRepository: ISpecificationRepository){

  }
  excute({ description, name }: IRequest): void{
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

  if (specificationAlreadyExists) {
    throw new Error('specification already exists!');
  }

  this.specificationsRepository.create({ name, description });
  }

}

export { CreateSpecificationUseCase }