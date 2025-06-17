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

export const getPostTitles = async (authorId) => {
	return await prisma.post.findMany({
		where: { AuthorId: authorId },
		select: { id: true, title: true },
	});
};

export const addPost = async (title, isPublished, content, authorId) => {
	return await prisma.post.create({
		data: {
			title: title,
			isPublished: isPublished === 'true',
			content: content,
			AuthorId: authorId,
		},
	});
};
