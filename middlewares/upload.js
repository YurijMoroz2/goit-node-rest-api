import multer from "multer";
import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: (req, file, cbk) => {
    cbk(null, path.join("tmp"));
  },
  filename: (req, file, cbk) => {
    const extension = file.mimetype.split("/")[1];

    cbk(null, `${req.user.id}-${nanoid()}.${extension}`);
  },
});

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(HttpError(400, "Please, upload images only.."), false);
  }
};

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
}).single("avatar");
