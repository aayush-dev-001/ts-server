import { Router } from "express";
import userRoutes from "./user.routes";
import { ResponseHandler } from "../utils/responseHandler";
import { env } from "../config/env";

const router = Router();

router.all("/", (req, res) => {
  ResponseHandler.success(res, [], "Welcome to the API " + env.API_VERSION);
});

router.use("/users", userRoutes);

export default router;
