import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertUser = async (username, email, password) => {
	return await prisma.user.create({
		data: {
			name: username,
			password: password,
			email: email,
		},
	});
};

export const findUser = async (username) => {
	return await prisma.user.findUnique({
		where: {
			name: username,
		},
	});
};
