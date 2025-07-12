import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: String; // or `mongoose.ObjectId` if you're being fancy
  }
}