import { Router } from 'express';
import posts from './posts.js';
import comments from './comments.js';
import login from './login.js';
import register from './register.js';
import passport from 'passport';

export const routes = Router();

routes.get('/', (req, res) => {
	return res.redirect('/posts');
});

routes.use('/posts', posts);
routes.use('/login', login);
routes.use('/register', register);

routes.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		res.status(200).json({ success: true, message: 'You are authorized' });
	}
);
