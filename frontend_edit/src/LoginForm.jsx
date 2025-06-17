import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ username: '', password: '' });
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	async function handleSubmit(e) {
		e.preventDefault();
		const response = await fetch('http://localhost:3000/adminLogin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
			}),
		});
		const responseObject = await response.json();
		setLocalStorage(responseObject);
		navigate('/');
	}
	async function setLocalStorage(responseObject) {
		const expires = moment().add(responseObject.expiresIn);
		localStorage.setItem('token', responseObject.token);
		localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
	}
	return (
		<>
			<h1>Please login</h1>
			<form onSubmit={handleSubmit}>
				<p>
					<label htmlFor="username">Username:</label>
					<br></br>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.name}
						onChange={handleChange}
					/>
				</p>
				<p>
					<label htmlFor="password">Password:</label>
					<br></br>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</p>
				<button type="submit">Login</button>
			</form>
		</>
	);
};

export { LoginForm };
