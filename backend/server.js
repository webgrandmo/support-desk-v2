const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Support Desk API' });
});
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);
