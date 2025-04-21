const express = require('express');
const app = express();
const port = 5600
const cors = require('cors');
require('dotenv').config()


app.use(cors());
app.use(express.json()); 

const { createAccount, loginAccount } = require('./controllers/Usercontrollers');


// Create User Account
app.post('/register', createAccount);

//User Login
app.post('/login', loginAccount);



app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
