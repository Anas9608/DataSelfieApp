/*server code to fetch geolocation of users and save it into my database*/


/*setting up my server at port 5000 in the local host*/

//import express modules
const express = require('express');
//executing the dependencies for the server
const app = express();

//import nedb package to server.js
const Datastore = require('nedb');

//setting up server
const port = 5000;
//express server listens at 127.0.0.1:5000
app.listen(port, () => {
    console.log("listening at " + port);
});
//display pages in the public directory
app.use(express.static('public'));

//parse the incoming data into json
app.use(express.json({
    limit: '1mb'
}));

// setting up database
const database = new Datastore('dataSelfie.db');
database.loadDatabase();
const timestamp = Date.now();
//processing http transactions
app.post('/myApiEndPoint', (req, res) => {
    console.log('recieved a post request from client');
    req.body.timestamp = timestamp;
    console.log(req.body);
    database.insert(req.body);
    res.json(req.body);
});
app.get('/myApiEndPoint', (req, res) => {
    database.find({},(err,data)=>{
        if(err){
            console.log("debug pls");
        }
        res.json(data);
    })
    
})