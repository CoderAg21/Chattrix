const express = require('express');
const config = require('./config/env');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./config/db');

//connect the database
db();



app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/signup', require('./Routes/signup'));
app.use('/login', require('./Routes/login'));
app.use('/contacts', require('./Routes/contacts'));
app.use('/logout', require('./Routes/logout'));
app.use('/add-contact', require('./Routes/addContact'));
app.use('/auth', require('./Routes/checkAuth'));
app.use('/message', require('./Routes/message'));
app.use('/show-message', require('./Routes/showStoredMessages'));

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
}  );
// app.use(cors({
