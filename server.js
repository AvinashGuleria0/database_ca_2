const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const connectToDb = require('./db')
const Routes = require('./Routes/route')

const Port = process.env.PORT;
const DB_url = process.env.DB_URL;

app.get('/home', (req, res) => {
    res.send(`Hello`)
})

app.use('/crud', Routes);



app.listen(Port, async() => {
    try{
        connectToDb(DB_url);
        console.log("connected to database")

        console.log(`Server is running on the port http://localhost:${Port}`)

    }catch(err){
        console.log(err);
    }
})