import { configDotenv } from 'dotenv';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

// MAIN ROUTE
app.get('/', (req, res) => res.send('Hello World!'));

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
