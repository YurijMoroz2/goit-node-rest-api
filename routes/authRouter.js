import { Router } from "express";

import {
  checkCurrent,
  register,
  login,
  checkLogout,
} from "../controllers/authControllers.js";
import {
  checkLoginData,
  checkSignupData,
  protect,
} from "../middlewares/authMiddlewares.js";

const router = Router();
router.post("/register", checkSignupData, register);

router.post("/login", checkLoginData, login);

router.post("/logout", protect, checkLogout);

router.get("/current", protect, checkCurrent);

export { router };
