
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

class CarsRepositoryInMemory implements ICarsRepository {

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
  async listAvailableCars(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    // filter retorna uma lista, find retorna um objeto
    let availableCars = this.cars.filter((car) => car.available === true);
    if (name || brand || category_id) {
      availableCars = availableCars.filter(
        (car) =>
          car.name === name ||
          car.brand === brand ||
          car.category_id === category_id
      );
    }

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
}


}

export { CarsRepositoryInMemory }