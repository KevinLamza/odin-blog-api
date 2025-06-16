const CreatePost = () => {
	async function uploadFormData(formData) {
		const response = await fetch('http://localhost:3000/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: formData.get('title'),
				isPublished: formData.get('isPublished'),
				content: formData.get('content'),
			}),
		});
		console.log(await response.json());
	}
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
					<p>Publish on upload:</p>
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
