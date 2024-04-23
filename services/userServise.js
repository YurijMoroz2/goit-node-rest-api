import path from "path";

import HttpError from "../helpers/HttpError.js";
import { UserAuth } from "../models/userModelAuth.js";
import { signToken } from "./jwtService.js";

export const createUserService = async (userData) => {
  const newUser = await UserAuth.create(userData);

  newUser.password = undefined;

  return newUser;
};
// ======================
export const getUsersService = () => UserAuth.find();
// =============================

export const updateUserService = (user, userData) => {
  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

/**
 * Delete user
 */
export const deleteUserService = (id) => UserAuth.findByIdAndDelete(id);

/**
 * Check if user exists by filter
 */
export const checkUserExistsService = (filter) => UserAuth.exists(filter);

/**
 * Get user by id
 */
export const getUserByIdService = (id) => UserAuth.findById(id);

// =========================================
export const signupUser = async (userData) => {
  const newUser = await UserAuth.create({
    ...userData,
    // role: userRoles.USER,
  });

  newUser.password = undefined;
  const token = signToken(newUser.id);

  return { newUser, token };
};
// =================================

export const loginUser = async ({ email, password }) => {
  const user = await UserAuth.findOne({ email }).select("+password");
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401, "Email or password is wrong");

  user.password = undefined;
  const token = signToken(user.id);

  const updatedUser = await UserAuth.findByIdAndUpdate(
    user.id,
    { token: token },
    { new: true }
  );

  return { user, token  };
};
// ===================================
