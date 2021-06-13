import { getRepository, Repository } from "typeorm";
import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";



class UsersTokensRepository implements IUsersTokensRepository {

  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expiration_date,
    refresh_token,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const user_token = this.repository.create({
      user_id,
      expiration_date,
      refresh_token,
    });

    await this.repository.save(user_token);

    return user_token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const user_tokens = await this.repository.findOne({
      where: { user_id, refresh_token },
    });

    return user_tokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refresh_token });
    return userToken;
  }
}

export { UsersTokensRepository }