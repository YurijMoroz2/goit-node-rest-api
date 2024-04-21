import { UserAuth } from "../models/userModelAuth.js";
import { loginUser, signupUser } from "../services/userServise.js";

export const register = async (req, res, next) => {
  try {
    const { newUser, token } = await signupUser(req.body);

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);

    res.status(200).json({
      token: token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const checkCurrent = (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      email: email,
      subscription: subscription,
    });
  } catch (error) {
    next(error);
  }
};
export const checkLogout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await UserAuth.findByIdAndUpdate(_id, { token: null });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
