import useAuthentification from './useAuthentification.jsx';
import { Navigate } from 'react-router-dom';

function Authentification() {
	const { error, loading } = useAuthentification();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>A network error was encountered</p>;
	else return <p>This shouldn't have happened :&#40;</p>;
}

export default Authentification;
