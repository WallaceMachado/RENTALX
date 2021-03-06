
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction) {

  const authHeader = request.headers.authorization;

  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  //Bearer hfduygwfsdncsdjhc
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;



        //para add user na tipagem do request é necessário sobescrever a tipagem do express
    // para isso foi cirada a pasta @types e nela o arquivo que faz essa ação
    request.user = {
      id: user_id,
    }

    next();

  } catch {
    throw new AppError("Invalid token", 401);
  }

}