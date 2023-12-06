import express from 'express';
import { getElectionInfo } from '../../controller/election';

const router = express.Router();

router.route('/').get(getElectionInfo);

export default router;
