//weather
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("Server is running on local-host: "+port);
}

//A GET route that returns the userDate object
app.get('/retrieveData', function (req, res) {
    res.send(projectData);
  })

//A Post route that updates the userDate object
app.post("/postUserData",function(req,res){
    //The UserData will be sent in a post request from the client side with the same fields
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(projectData);
})

