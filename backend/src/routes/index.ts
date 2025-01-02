import express, { Router } from "express";
import userRouter from "./user.routes";

const router: Router = express.Router();

// Mount the userRouter under the "/github" prefix
router.use("/github", userRouter);

export default router;
