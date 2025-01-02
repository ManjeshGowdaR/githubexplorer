import Joi, { ObjectSchema } from "joi";

/**
 * Validation schema for searching users
 */
const searchUsers: ObjectSchema = Joi.object().keys({
  username: Joi.string(),
  location: Joi.string(),
  company: Joi.string(),
});

/**
 * Validation schema for updating user
 */
const updateUser: ObjectSchema = Joi.object().keys({
  location: Joi.string(),
  blog: Joi.string(),
  bio: Joi.string(),
});

/**
 * Validation schema for listing users
 */
const listUsers: ObjectSchema = Joi.object().keys({
  sortBy: Joi.string(),
});

export { searchUsers, updateUser, listUsers };
