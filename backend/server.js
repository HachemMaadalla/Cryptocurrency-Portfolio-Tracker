require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());

// Dummy data for example
const portfolio = [
  { id: 1, name: 'Bitcoin', value: 40000 },
  { id: 2, name: 'Ethereum', value: 2500 },
];

app.get('/api/portfolio', (req, res) => {
  res.json(portfolio);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
