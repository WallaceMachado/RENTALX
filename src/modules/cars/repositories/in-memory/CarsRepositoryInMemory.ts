
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

class CarsRepositoryInMemory implements ICarsRepository{

  private cars: Car[] = [];

  async create({
      name,
      category_id,
      brand,
      fine_amount,
      license_plate,
      daily_rate,
      description,

  }: ICreateCarDTO): Promise<Car> {
      const car = new Car();

      Object.assign(car, {
          name,
          category_id,
          brand,
          fine_amount,
          license_plate,
          daily_rate,
      description,
      });

      this.cars.push(car);

      return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
      const car = this.cars.find(
          (car) => car.license_plate === license_plate
      );

      return car;
  }

  

}

export { CarsRepositoryInMemory}