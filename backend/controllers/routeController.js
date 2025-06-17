import bcrypt from 'bcryptjs';
import * as queryController from '../controllers/queryController.js';
import * as authentificationController from '../controllers/authentificationController.js';

export const postCreateUser = async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await queryController.insertUser(
			req.body.username,
			req.body.email,
			hashedPassword
		);
		const jwt = authentificationController.issueJWT(user);
		res.json({
			success: true,
			user: user,
			token: jwt.token,
			expiresIn: jwt.expiresIn,
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};

export const postLoginUser = async (req, res, next) => {
	try {
		const user = await queryController.findUser(req.body.username);

		if (!user) {
			res.status(401).json({
				success: false,
				message: 'Could not find user',
			});
			return;
		}
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			res.status(401).json({
				success: false,
				message: 'Wrong password',
			});
			return;
		}
		const jwt = authentificationController.issueJWT(user);
		res.status(200).json({
			success: true,
			user: user,
			token: jwt.token,
			expiresIn: jwt.expiresIn,
		});
	} catch (err) {
		return next(err);
	}
};

export const postLoginAdmin = async (req, res, next) => {
	try {
		const user = await queryController.findUser(req.body.username);

		if (!user || user.name != 'kevin') {
			res.status(401).json({
				success: false,
				message: 'Wrong username',
			});
			return;
		}
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			res.status(401).json({
				success: false,
				message: 'Wrong password',
			});
			return;
		}
		const jwt = authentificationController.issueJWT(user);
		res.status(200).json({
			success: true,
			user: user,
			token: jwt.token,
			expiresIn: jwt.expiresIn,
		});
	} catch (err) {
		return next(err);
	}
};

export const getPostTitles = async (req, res, next) => {
	try {
		const posts = await queryController.getPostTitles(req.headers.userId);
		res.status(200).json({ success: true, posts: posts });
		return;
	} catch (err) {
		return next(err);
	}
};

export const addPost = async (req, res, next) => {
	try {
		const post = await queryController.addPost(
			req.body.title,
			req.body.isPublished,
			req.body.content,
			req.body.AuthorId
		);
		res.status(200).json({ success: true });
	} catch (err) {
		return next(err);
	}
};
