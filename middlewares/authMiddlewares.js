import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import { checkToken } from "../services/jwtService.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../services/userServise.js";

export const checkSignupData = async (req, res, next) => {
  try {
    const { value } = validateBody(registerSchema)(req, res, next);

    if (!value) throw HttpError(401);

    const userExists = await checkUserExistsService({ email: value.email });

    if (userExists) throw HttpError(409, "Email in use");

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
};

export const checkLoginData = async (req, res, next) => {
  try {
    const { value } = validateBody(loginSchema)(req, res, next);

    if (!value) throw HttpError(400);

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

    const userId = checkToken(token);

    if (!userId) throw HttpError(401);

    const currentUser = await getUserByIdService(userId);

    if (!currentUser) throw HttpError(401);

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};
