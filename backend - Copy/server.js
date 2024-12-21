const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const cors = require('cors');
const AuthRouter=require('./routes/AuthRouter')

require('dotenv').config(); // Add parentheses to properly invoke dotenv.conf
require('./Models/db');
const PORT = process.env.PORT || 9090;
app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});