import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IDateProvider } from "@shared/container/provaiders/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/provaiders/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepository: UsersTokensRepository;
let dateProvider: IDateProvider;
describe('Authenticate User', () => {
  //executado antes do teste
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory, usersTokensRepository, dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate user', async () => {
    const user: ICreateUserDTO = {
      name: 'Wallace',
      email: 'wallace@email.com',
      password: '1234',
      driver_license: '000111333',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });


    //espera que no retorno tenha um objeto com a propriedade token
    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate nonexistent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexistent@email.com',
        password: '1234',
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it('Should not be able to authenticate user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'Wallace',
      email: 'wallace@email.com',
      password: '1234',
      driver_license: '000111333',
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectPassword',
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});