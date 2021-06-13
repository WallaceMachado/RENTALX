import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/provaiders/DateProvider/implementations/DayjsDateProvider";


let rentalsRepository: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;

let sampleRental_Car1_User1: ICreateRentalDTO;
let sampleRental_Car2_User1: ICreateRentalDTO;
let sampleRental_Car1_User2: ICreateRentalDTO;
let sampleRentalLessThan24h: ICreateRentalDTO;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    rentalsRepository = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository,


    );
  });

  beforeAll(() => {

    sampleRental_Car1_User1 = {
      car_id: '12345',
      user_id: '54321',
      expected_return_date: dayAdd24Hours,
    };
    sampleRental_Car2_User1 = {
      car_id: '23456',
      user_id: '54321',
      expected_return_date: dayAdd24Hours,
    };
    sampleRental_Car1_User2 = {
      car_id: '12345',
      user_id: '65432',
      expected_return_date: dayAdd24Hours,
    };
    sampleRentalLessThan24h = {
      car_id: '12345',
      user_id: '54321',
      expected_return_date: dayjs().toDate(),
    };
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'HB-20',
      description: 'Cool car',
      brand: 'Hyundai',
      category_id: '471a440e-3a3c-4342-832f-4e74e475e9e3',
      daily_rate: 90,
      fine_amount: 30,
      license_plate: 'NPM-1028',
    });
    const rental = await createRentalUseCase.execute(
      {
        user_id: "132456",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      }
    );

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if user already has an ongoing one', async () => {
    sampleRental_Car1_User1.car_id = '11112';
    await rentalsRepository.create(sampleRental_Car1_User1);
    await expect(createRentalUseCase.execute(sampleRental_Car2_User1)
    ).rejects.toEqual(new AppError('User can only rent one car at a time!'));
  });

  it('Should not be able to create a new rental if car has already been rented', async () => {

    await rentalsRepository.create(sampleRental_Car1_User2);
    // await createRentalUseCase.execute(sampleRental_Car1_User1);
    await expect(createRentalUseCase.execute(sampleRental_Car1_User2)
    ).rejects.toEqual(new AppError('Car currently rented!'));
  });

  it('Should not be able to create a new rental if rental duration is less than 24 hours', async () => {
    await expect(createRentalUseCase.execute(sampleRentalLessThan24h)
    ).rejects.toEqual(new AppError('Rental duration needs to be longer than 24 hours!'));
  });
});