import bcrypt from 'bcryptjs';
import * as queryController from '../controllers/queryController.js';
import * as authentificationController from '../controllers/authentificationController.js';

export const postCreateUser = async (req, res, next) => {
	// let errors = validationResult(req);
	// const checkUser = await queryController.findUser(req.body.username);
	// errors = errors.array();
	// if (checkUser && checkUser.name === req.body.username) {
	// 	errors.push({
	// 		type: 'field',
	// 		value: req.body.username,
	// 		msg: 'A user with this name exists already',
	// 		path: 'username',
	// 		location: 'body',
	// 	});
	// }
	// if (errors.length !== 0) {
	// 	return res.status(400).render('sign-up-form', {
	// 		title: 'sign-up',
	// 		errors: errors,
	// 	});
	// }
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
			// return done(null, false, { message: 'Incorrect username' });
			res.status(401).json({
				success: false,
				message: 'Could not find user',
			});
			return;
		}
		console.log(req.body.password);
		console.log(user);
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			// return done(null, false, { message: 'Incorrect password' });
			res.status(401).json({
				success: false,
				message: 'Wrong password',
			});
			return;
		}
		const jwt = authentificationController.issueJWT(user);
		// return done(null, user);
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
			// return done(null, false, { message: 'Incorrect username' });
			res.status(401).json({
				success: false,
				message: 'Wrong username',
			});
			return;
		}
		console.log(req.body.password);
		console.log(user);
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			// return done(null, false, { message: 'Incorrect password' });
			res.status(401).json({
				success: false,
				message: 'Wrong password',
			});
			return;
		}
		const jwt = authentificationController.issueJWT(user);
		// return done(null, user);
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
