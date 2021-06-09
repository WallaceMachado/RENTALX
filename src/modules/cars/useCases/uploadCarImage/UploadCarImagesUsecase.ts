import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class UploadCarImagesUseCase {

  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) { }

  async execute(car_id: string, images_name: string[]): Promise<void> {
    images_name.map(async (image) => {
      await this.carImagesRepository.create(car_id, image);
    });
  }

}

export { UploadCarImagesUseCase }