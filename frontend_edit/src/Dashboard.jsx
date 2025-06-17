import useAuthentification from './useAuthentification.jsx';
import { Link } from 'react-router-dom';

function Dashboard() {
	useAuthentification();
	return (
		<>
			<Link to="/logout">Logout</Link>
			<p>This is the dashboard</p>
		</>
	);
}

export { Dashboard };
