import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthentification from './useAuthentification.jsx';

function Dashboard() {
	const { error, loading } = useAuthentification();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/titles', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				userId: localStorage.getItem('user'),
			},
		})
			.then((res) => {
				if (res.status >= 400) {
					throw new Error('server error');
				}
				return res.json();
			})
			.then((res) => {
				console.log(res);
				setPosts(res.posts);
			});
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>A network error was encountered</p>;
	else
		return (
			<>
				<Link to="/logout">Logout</Link>
				<br></br>
				<Link to="/createPost">Create new post</Link>
				<p>This is the dashboard</p>
				<ul>
					{posts.map((post) => {
						return <li key={post.id}>{post.title}</li>;
					})}
				</ul>
			</>
		);
}

export { Dashboard };
