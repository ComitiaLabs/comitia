import express from 'express';
import { getIdentity } from '../controller/identity.controller';
import { getProtocols } from '../controller/protocol.controller';

const router = express.Router();

router.route('/identity').get(getIdentity);
router.route('/protocols').get(getProtocols);

export default router;
