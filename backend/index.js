import { configDotenv } from 'dotenv';
import express, { application, urlencoded } from 'express';
import passport from 'passport';
import cors from 'cors';
import { routes } from './routes/routes.js';

const PORT = process.env.PORT || 3000;

const app = express();

// MAIN ROUTE
app.use(passport.initialize());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use('/', routes);

// ERROR HANDLING
app.use((err, req, res, next) => {
	// next löschen?
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});

// START SERVER
app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
