import { ObjectSchema } from "joi"; // Importing ObjectSchema from Joi
import { Request, Response, NextFunction } from "express"; // Importing Request, Response, and NextFunction types from Express
import httpStatus from "http-status"; // Importing httpStatus for HTTP status codes

/**
 * Middleware to validate query parameters based on a Joi schema.
 * @param schema - Joi schema for query validation.
 * @returns Express middleware function.
 */
const validateQuery = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
    }
    next();
  };
};

/**
 * Middleware to validate request body based on a Joi schema.
 * @param {ObjectSchema} schema - Joi schema for body validation.
 * @returns {Function} Express middleware function.
 */
const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }

    next();
  };
};
export { validateQuery, validateBody };
