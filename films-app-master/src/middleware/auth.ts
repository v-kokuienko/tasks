import * as express from "express";
import * as jwt from "jsonwebtoken";
import { AllUsersInstance } from "../models/users/allUsersModel";
import {
  UnauthorizedError,
  BadRequestError,
  InternalServerError,
} from "../utils/errors";
import { requiresAuth } from "express-openid-connect";

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token = request.header("Authorization").replace("Bearer ", "");

    return new Promise((resolve, reject) => {
      try {
        if (!token) {
          reject(new BadRequestError());
        }
        jwt.verify(
          token,
          process.env.JWT_SECRET,
          function (err: any, decoded: any) {
            if (err) {
              reject(err);
            }
            AllUsersInstance.getUserById(parseInt(decoded.id))
              .then((user) => {
                if (!user.tokens.includes(token)) {
                  throw new UnauthorizedError();
                }
                resolve(user);
              })
              .catch((err) => {
                reject(err);
              });
          }
        );
      } catch (e) {
        throw new InternalServerError();
      }
    });
  }

  if (securityName === "auth0") {
    return new Promise((resolve, reject) => {
      try {
        if (!request.oidc.isAuthenticated()) {
          reject(new UnauthorizedError());
        }
        // @ts-ignore
        request.user = request.oidc.user;
        // @ts-ignore
        request.user.accessType = request.oidc.user?.[`${process.env.auth0issuerBase}/roles`]?.[0]
        // @ts-ignore
        resolve(request.user);
      } catch (e) {
          console.log(e)
        throw new InternalServerError();
      }
    });
  }
}
