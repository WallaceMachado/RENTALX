import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  //Bearer hfduygwfsdncsdjhc
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "c9b3d086beed799c29c857496acf4646");

    console.log(decoded);

  } catch {
    throw new Error("Invalid token");
  }

}