import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/provaiders/DateProvider/IDateProvider";




interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    if (this.dateProvider.compareIfBefore(userToken.expiration_date, this.dateProvider.dateNow())) {
      throw new AppError('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);


    //create = updade quando o id já existe no bd
    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }

}

export { ResetPasswordUserUseCase }