import asyncHandler from 'express-async-handler';

export const test = asyncHandler(async (req, res, next) => {
  res.send('HELLO WORLD');
});
