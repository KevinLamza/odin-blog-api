import { Router } from 'express';
import comments from './comments.js';

const router = Router();

router.get('/', (req, res) => {
	res.send('GET all posts');
});

router.post('/', (req, res) => {
	res.send('POST new post');
});

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
