import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../config";
import { ENUM_USER_ROLE } from "../../enums/user";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: ENUM_USER_ROLE;
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not Authorized, sent a token by 'authorization' in headers"
        );
      }

      let verifiedUser: CustomJwtPayload | null = null;

      verifiedUser = jwt.verify(
        token,
        config.jwt_secret_key as Secret
      ) as CustomJwtPayload;

      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
      }

      // req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
