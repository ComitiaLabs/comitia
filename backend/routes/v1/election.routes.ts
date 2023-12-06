import express from 'express';
import { createElection } from '../../controller/election';
import { electionCreateSchema } from '../../schemas/election';
import validate from '../../utils/validator';

const router = express.Router();

router.route('/').post(validate(electionCreateSchema), createElection);

export default router;
