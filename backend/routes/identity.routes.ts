import express from 'express';
import { getIdentity } from '../controller/identity.controller';

const router = express.Router();

router.route('/').get(getIdentity);

export default router;
