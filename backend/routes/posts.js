import { Router } from 'express';
import comments from './comments.js';
import * as routeController from '../controllers/routeController.js';

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'GET all posts' });
});

router.post('/', routeController.addPost);

router.get('/:postId', (req, res) => {
	res.send(`GET post with ID ${req.params.postId}`);
});

router.put('/:postId', (req, res) => {
	res.send(`UPDATE post with ID ${req.params.postId}`);
});

router.delete('/:postId', (req, res) => {
	res.send(`DELETE post with ID ${req.params.postId}`);
});

router.use('/:postId/comments', comments);

export default router;
