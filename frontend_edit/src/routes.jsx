import App from './App';
import { CreatePost } from './CreatePost.jsx';
import ErrorPage from './ErrorPage';

const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'createPost',
		element: <CreatePost />,
	},
];

export default routes;
