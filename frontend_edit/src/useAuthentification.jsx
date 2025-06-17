import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthentification = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			fetch('http://localhost:3000/isAdmin', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			})
				.then((res) => {
					if (res.status == 401) {
						navigate('/login');
					}
					if (res.status >= 400) {
						throw new Error('server error');
					}
					return res.json();
				})
				.then((response) => {
					if (response.success == true) {
						return;
					}
				})
				.catch((error) => setError(error))
				.finally(() => setLoading(false));
		} else {
			navigate('/login');
		}
	}, [navigate]);

	return { error, loading };
};

export default useAuthentification;
