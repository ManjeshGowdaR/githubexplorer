import express, { Router, Request, Response, NextFunction } from "express";
import { userController } from "../controllers";
import { validate } from "../middlewares";
import { user } from "../validations";

const router: Router = express.Router();

// Route to save a user
router.get(
  "/save-user/:username",
  (req: Request, res: Response, next: NextFunction) => {
    userController.saveUser(req, res, next);
  }
);

// Route to find mutual followers
router.get(
  "/mutual-followers/:username",
  (req: Request, res: Response, next: NextFunction) =>
    userController.findMutualFollowers(req, res, next)
);

// Route to search users with query validation middleware
router.get(
  "/search-users",
  validate.validateQuery(user.searchUsers),
  (req: Request, res: Response, next: NextFunction) =>
    userController.searchUsers(req, res, next)
);

// Route to soft delete a user
router.delete(
  "/delete-user/:username",
  (req: Request, res: Response, next: NextFunction) =>
    userController.deleteUser(req, res, next)
);

// Route to update a user with body validation middleware
router.patch(
  "/update-user/:username",
  validate.validateBody(user.updateUser),
  (req: Request, res: Response, next: NextFunction) =>
    userController.updateUser(req, res, next)
);

// Route to list users with query validation middleware
router.get(
  "/list-users",
  validate.validateQuery(user.listUsers),
  (req: Request, res: Response, next: NextFunction) =>
    userController.listUsers(req, res, next)
);

export default router;
