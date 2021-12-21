const express = require('express');
const connectDB = require('./config/db');

const users = require('./routes/api/user');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
