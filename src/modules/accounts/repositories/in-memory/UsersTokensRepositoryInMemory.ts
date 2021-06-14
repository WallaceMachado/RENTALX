import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";


class UsersTokenRepositoryInMemory {

  usersTokens: UserTokens[] = [];

  async create({
    expiration_date,
    refresh_token,
    user_id
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expiration_date,
      refresh_token,
      user_id
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);
    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    return userToken;
  }


}

export { UsersTokenRepositoryInMemory }