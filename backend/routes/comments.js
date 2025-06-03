import { Router } from 'express';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
	res.send(`GET all comments of post Id ${req.params.postId}`);
});

router.post('/', (req, res) => {
	res.send(`POST new comment on post Id ${req.params.postId}`);
});

router.get('/:commentId', (req, res) => {
	res.send(
		`GET comment with ID ${req.params.commentId} from post Id ${req.params.postId}`
	);
});

router.put('/:commentId', (req, res) => {
	res.send(
		`UPDATE comment with ID ${req.params.commentId} from post Id ${req.params.postId}`
	);
});

router.delete('/:commentId', (req, res) => {
	res.send(
		`DELETE comment with ID ${req.params.commentId} from post Id ${req.params.postId}`
	);
});

export default router;
