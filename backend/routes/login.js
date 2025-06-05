import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as routeController from '../controllers/routeController.js';
const router = Router();

router.post('/', routeController.postLoginUser);

export default router;
