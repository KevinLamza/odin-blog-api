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
	const expiresIn = '1d';
	const payload = {
		sub: id,
		iat: Math.floor(Date.now() / 1000),
	};
	const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
		expiresIn: expiresIn,
	});

	return {
		token: 'Bearer ' + signedToken,
		expiresIn: expiresIn,
	};
};
