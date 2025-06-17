import { Navigate } from 'react-router-dom';
import Authentification from './Authentification.jsx';
import { LoginForm } from './LoginForm.jsx';
import { Logout } from './Logout.jsx';
import { Dashboard } from './Dashboard.jsx';
import { CreatePost } from './CreatePost.jsx';
import ErrorPage from './ErrorPage';

const routes = [
	{
		path: '/',
		element: <Navigate replace to="/dashboard" />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login',
		element: <LoginForm />,
	},
	{
		path: '/logout',
		element: <Logout />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
	{
		path: '/createPost',
		element: <CreatePost />,
	},
	{
		path: '*',
		element: <Navigate replace to="/dashboard" />,
	},
];

export default routes;
