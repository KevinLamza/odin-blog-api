import { Link } from 'react-router-dom';
import { Login } from './Login.jsx';

function App() {
	return (
		<>
			<Login></Login>
			<h1>Edit View</h1>
			<Link to="createPost">Create new post</Link>
		</>
	);
}

export default App;
