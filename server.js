const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Forbinde til MongoDB
mongoose.connect('mongodb://localhost:27017/undercovergame', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Skema til brugeroplysninger
const userSchema = new mongoose.Schema({
  playerName: String
});
const User = mongoose.model('User', userSchema);

// Middleware for at parse JSON-anmodninger
app.use(bodyParser.json());

// Servér statiske filer fra rodmappen
app.use(express.static(path.join(__dirname)));

// Post endpoint til at gemme brugeroplysninger
app.post('/api/users', async (req, res) => {
  const { playerNames } = req.body;
  try {
    const newUsers = await User.insertMany(playerNames.map(name => ({ playerName: name })));
    res.status(201).json({ message: 'Brugere oprettet', users: newUsers });
  } catch (error) {
    res.status(500).json({ message: 'Der opstod en fejl', error: error.message });
  }
});

// Servér index.html, når roden af webstedet besøges
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start serveren
app.listen(port, () => {
  console.log(`Server kører på http://localhost:${port}`);
});
