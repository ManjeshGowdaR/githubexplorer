import { query, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { userService } from "../services";
import { string } from "joi";

/**
 * Save a user by username.
 * @param {Request} req - Express request object containing the username in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} Promise that resolves to an Express response object.
 */
const saveUser = catchAsync(async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await userService.saveUser(username);
  return res.status(httpStatus.OK).send(user);
});

/**
 * Find mutual followers for a user by username.
 * @param {Request} req - Express request object containing the username in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} Promise that resolves to an Express response object.
 */
const findMutualFollowers = catchAsync(async (req: Request, res: Response) => {
  let { username } = req.params;
  let mutuals = await userService.mutualFollowers(username);
  return res.status(httpStatus.OK).send(mutuals);
});

/**
 * Search users based on query parameters.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} Express response object.
 */
const searchUsers = catchAsync(async (req: Request, res: Response) => {
  let users = await userService.searchUsers(req.query);
  return res.status(httpStatus.OK).send(users);
});

/**
 * Soft delete a user by username.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} Express response object.
 */
const deleteUser = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    let { username } = req.params;
    let user = await userService.deleteUser(username);
    return res.status(httpStatus.OK).send(user);
  }
);

/**
 * Update a user by username.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} Express response object.
 */
const updateUser = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    let user = await userService.updateUser(req.body, req.params.username);
    return res.status(httpStatus.OK).send(user);
  }
);

/**
 * List users based on query parameters.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} Express response object.
 */
const listUsers = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    let users = await userService.listUsers(req.query);
    return res.status(httpStatus.OK).send(users);
  }
);

export {
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
