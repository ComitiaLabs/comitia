import asyncHandler from 'express-async-handler';
import electionConfig from '../election.config';

export const getElectionInfo = asyncHandler(async (req, res) => {
  const config = electionConfig;

  res.status(200).json({ data: config });
});
