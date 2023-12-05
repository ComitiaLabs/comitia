import express from 'express';
import base from './base.routes';

const router = express.Router();

router.use('/base', base);

export default router;
