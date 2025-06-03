import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.send('GET all posts');
});

export default router;
