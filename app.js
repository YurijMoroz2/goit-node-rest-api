import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';

import contactsRouter from "./routes/contactsRouter.js";
import {router as authRouter} from "./routes/authRouter.js";

dotenv.config();  

const app = express();

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{console.log('MongoDB connected...');})
.catch((err)=>{
  console.log(err);
  process.exit();})

if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  // console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
