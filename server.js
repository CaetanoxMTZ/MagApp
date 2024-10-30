const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport'); 

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});