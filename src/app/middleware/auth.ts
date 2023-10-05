import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../config";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not Authorized, send a token via 'authorization' in headers"
        );
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_secret_key as Secret
      ) as JwtPayload;
      req.user = verifiedUser;

      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
      }

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
