
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository) {

  }
  async excute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('specification already exists!');
    }

    await this.specificationsRepository.create({ name, description });
  }

}

export { CreateSpecificationUseCase }