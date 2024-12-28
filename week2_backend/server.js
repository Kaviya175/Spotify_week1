const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const cors = require('cors');
const AuthRouter=require('./routes/AuthRouter')
//const mongoose=require('mongoose');
//const DB_UR1='mongodb://localhost:27017/authDB'
require('dotenv').config(); // Add parentheses to properly invoke dotenv.conf
require('./Models/db');
const PORT = process.env.PORT || 9090;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use(bodyParser.json());
app.use(cors());
//mongoose.connect(DB_UR1).then(()=>{
  //  console.log('Connected to MongoDB');
//}).catch((err)=>{
  //  console.log('Error connecting to MongoDB',err);
//});



app.use('/auth',AuthRouter)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});