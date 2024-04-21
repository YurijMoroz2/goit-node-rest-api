import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchemaAuth = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchemaAuth.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});
userSchemaAuth.methods.checkUserPassword = (candidate, paswordHash) =>
  bcrypt.compare(candidate, paswordHash);

export const UserAuth = model("user", userSchemaAuth);
