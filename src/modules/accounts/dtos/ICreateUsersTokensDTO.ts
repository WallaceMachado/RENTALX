

interface ICreateUsersTokensDTO {

  user_id: string;
  expiration_date: Date;
  refresh_token: string;

}

export { ICreateUsersTokensDTO }