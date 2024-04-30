import { Router } from "express";

import {
  checkCurrent,
  register,
  login,
  checkLogout,
  updateAvatar,
  verifyUser,
  resendVerifyEmail,
} from "../controllers/authControllers.js";
import {
  checkLoginData,
  checkSignupData,
  protect,
} from "../middlewares/authMiddlewares.js";
import { uploadAvatar } from "../middlewares/upload.js";

const router = Router();
router.post("/register", checkSignupData, register);

router.post("/login", checkLoginData, login);

router.post("/logout", protect, checkLogout);

router.get("/current", protect, checkCurrent);

router.patch("/avatars" , protect, uploadAvatar, updateAvatar );

router.get('/verify/:verificationToken', verifyUser);

router.post('/verify', resendVerifyEmail)

export { router };
