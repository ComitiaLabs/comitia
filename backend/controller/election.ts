import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { electionCreateSchema } from '../schemas/election';

export const createElection = asyncHandler<any, any, z.infer<typeof electionCreateSchema>['body']>(
  async (req, res) => {
    const info = req.body;

    res.status(200).json({ data: info });
  }
);
