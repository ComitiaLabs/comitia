import asyncHandler from 'express-async-handler';
import { type AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) =>
  asyncHandler(async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      res.status(400).json(error).end();
    }
  });

export default validate;
