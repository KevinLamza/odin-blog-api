import { Router } from 'express';
import posts from './posts.js';
import comments from './comments.js';

export const routes = Router();

routes.get('/', (req, res) => {
	return res.redirect('/posts');
});

routes.use('/posts', posts);
