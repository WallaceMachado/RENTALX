import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";


interface IUsersTokensRepository {
  create({
    user_id,
    expiration_date,
    refresh_token,
  }: ICreateUsersTokensDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository }