import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
	const navigate = useNavigate();
	localStorage.clear();

	useEffect(() => {
		navigate('/');
	}, [navigate]);
}

export { Logout };
