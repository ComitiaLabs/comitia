import express from 'express';
import base from './base.routes';

const router = express.Router();

router.route('/base').get(base);

export default router;
