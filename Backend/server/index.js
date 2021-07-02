const express = require('express');
const cors = require('cors');

//creating a server app via express
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', require('./user'));

app.listen(3000, () => { console.log('Server started at port 3000....') });