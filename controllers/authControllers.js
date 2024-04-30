import path from "path";
import { promises as fs } from "fs";
import Jimp from "jimp";

import { UserAuth } from "../models/userModelAuth.js";
import { loginUser, signupUser } from "../services/userServise.js";
import { sendEmail } from "../helpers/sendEmail.js";
import HttpError from "../helpers/HttpError.js";
import { emailSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";

export const register = async (req, res, next) => {
  try {
    const { newUser, token } = await signupUser(req.body);

    const verifyEmail = {
      to: req.body.email,
      subject: "Verify email",
      html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${newUser.verificationToken}">Click verify email</a>`,
    };
    
    await sendEmail(verifyEmail);

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

export const updateAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    const { _id } = req.user;
    const { path: tempUpload, originalname } = file;

    const image = await Jimp.read(file.path);
    await image.resize(250, 250);
    await image.writeAsync(file.path);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(path.join("public", "avatars"), filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", originalname);
    await UserAuth.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await UserAuth.findOne({ verificationToken });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) throw HttpError(400, "Verification has already been passed");

    await UserAuth.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      message: "Verification successful",
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const body = req.body;

    if (!body || Object.keys(body).length === 0 || !email) {
      throw HttpError(400, "missing required field email");
    }
    
    const validate = validateBody(emailSchema)(req, res, next);

    const user = await UserAuth.findOne({ email });
    
    if (!user) {
      throw HttpError(401);
    }
    
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
    
  } catch (error) {
    next(error);
  }
};
