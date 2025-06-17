import { Router } from 'express';
import * as routeController from '../controllers/routeController.js';

const router = Router();

router.get('/', routeController.getPostTitles);

export default router;
