// import fs from 'fs';
// import * as path from 'path';
// import { fileURLToPath } from 'url';
import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
	new JwtStrategy(opts, async function (jwt_payload, done) {
		try {
			const user = await prisma.user.findUnique({
				where: { id: jwt_payload.sub },
			});
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	})
);

export const issueJWT = (user) => {
	const id = user.id;
	const expiresIn = '1m';
	const payload = {
		sub: id,
		iat: Math.floor(Date.now() / 1000),
	};

	console.log(Date.now());

	const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
		expiresIn: expiresIn,
	});

	return {
		token: 'Bearer ' + signedToken,
		expiresIn: expiresIn,
	};
};

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

// const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// const options = {
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: PUB_KEY,
// 	algorithms: ['RSA256'],
// };

// const passportJWTOptions = {
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: PUB_KEY || secret phrase,
// 	issuer: 'enter issuer here',
// 	audience: 'enter audience here',
// 	algorithms: ['RS256'],
// 	ignoreExpiration: false,
// 	passReqToCallback: false,
// 	jsonWebTokenOptions: {
// 		complete: false,
// 		clockTolerance: '',
// 		maxAge: '2d',
// 		clockTimestamp: '100',
// 		nonce: 'string here for OpenID'
// 	}
// }

// passport.use(
// 	new LocalStrategy(async (username, password, done) => {
// 		try {
// 			const user = await prisma.users.findUnique({
// 				where: { name: username },
// 			});

// 			if (!user) {
// 				return done(null, false, { message: 'Incorrect username' });
// 			}
// 			const match = await bcrypt.compare(password, user.password);
// 			if (!match) {
// 				return done(null, false, { message: 'Incorrect password' });
// 			}
// 			return done(null, user);
// 		} catch (err) {
// 			return done(err);
// 		}
// 	})
// );

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
// 	try {
// 		const user = await prisma.users.findUnique({ where: { id: id } });

// 		done(null, user);
// 	} catch (err) {
// 		done(err);
// 	}
// });

// export const authenticateUser = function (req, res, next) {
// 	passport.authenticate('local', function (err, user, info) {
// 		if (err) {
// 			return next(err);
// 		}
// 		if (!user) {
// 			console.log(info.message);
// 			return res.render('index', { errors: [{ msg: info.message }] });
// 		}

// 		// NEED TO CALL req.login()!!!
// 		req.login(user, next);
// 	})(req, res, next);
// };

// export const isAuthenticated = (req, res, next) => {
// 	if (req.user) {
// 		next();
// 	} else {
// 		res.redirect('/');
// 	}
// };

// export const logOut = (req, res, next) => {
// 	if (req.user) {
// 		req.logout(function (err) {
// 			if (err) {
// 				return next(err);
// 			}
// 			res.redirect('/');
// 		});
// 	} else {
// 		res.redirect('/');
// 	}
// };
