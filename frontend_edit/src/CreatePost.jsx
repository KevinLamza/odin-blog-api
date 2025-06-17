import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthentification from './useAuthentification.jsx';

const CreatePost = () => {
	const { error, loading } = useAuthentification();
	const [fetchError, setFetchError] = useState(null);

	const navigate = useNavigate();
	async function uploadFormData(formData) {
		fetch('http://localhost:3000/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: formData.get('title'),
				isPublished: formData.get('isPublished'),
				content: formData.get('content'),
				AuthorId: localStorage.getItem('user'),
			}),
		})
			.then((res) => {
				if (res.status >= 400) {
					throw new Error('server error');
				}
				// return res.json();
			})
			.catch((error) => setFetchError(error))
			.finally(() => navigate('/dashboard'));
	}
	if (loading) return <p>Loading...</p>;
	if (error) return <p>A network error was encountered</p>;
	if (fetchError)
		return <p>A network error during fetching the posts was encountered</p>;
	else
		return (
			<>
				<h1>Create Post</h1>
				<form action={uploadFormData}>
					<p>
						<label for="title">Title:</label>
						<br></br>
						<input type="text" id="title" name="title" />
					</p>
					<p>
						Publish on upload:
						<input
							type="radio"
							id="publishYes"
							value="true"
							name="isPublished"
						></input>
						<label for="publishYes">Yes</label>
						<br></br>
						<input
							type="radio"
							id="publishNo"
							value="false"
							name="isPublished"
						></input>
						<label for="publishNo">No</label>
					</p>
					<p>
						<label for="content">Content:</label>
						<br></br>
						<textarea
							rows="30"
							cols="120"
							name="content"
							id="content"
						></textarea>
					</p>
					<button type="submit">Upload Post</button>
				</form>
			</>
		);
};

export { CreatePost };
