import HttpError from "../helpers/HttpError.js";
import { UserModel } from "../models/userModel.js";
import { signToken } from "./jwtService.js";
import { nanoid } from "nanoid";

export const createUserService = async (userData) => {
  const newUser = await UserModel.create(userData);

  newUser.password = undefined;

  return newUser;
};
// ======================
export const getUsersService = () => UserModel.find();
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
export const deleteUserService = (id) => UserModel.findByIdAndDelete(id);

/**
 * Check if user exists by filter
 */
export const checkUserExistsService = (filter) => UserModel.exists(filter);

/**
 * Get user by id
 */
export const getUserByIdService = (id) => UserModel.findById(id);

// =========================================
export const signupUser = async (userData) => {
  
  const verificationToken = nanoid();

  const newUser = await UserModel.create({
    ...userData,
    verificationToken,
    // role: userRoles.USER,
  });

  newUser.password = undefined;
  const token = signToken(newUser.id);

  return { newUser, token };
};
// =================================

export const loginUser = async ({ email, password }) => {

  const user = await UserModel.findOne({ email }).select("+password");
  
  if (!user) throw HttpError(401, "Email or password is wrong");

  if(!user.verify) throw HttpError(401, "Check failed")

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401, "Email or password is wrong");

  user.password = undefined;
  const token = signToken(user.id);

  const updatedUser = await UserModel.findByIdAndUpdate(
    user.id,
    { token: token },
    { new: true }
  );

  return { user, token  };
};
// ===================================
