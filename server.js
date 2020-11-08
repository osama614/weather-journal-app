// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log("server running"); 
    console.log(`running on http://127.0.0.1:${port}`);
});

// server routs

app.post('/weatherData', (req, res) => {
    let data = req.body;
    projectData.temperature = data.temperature;
    projectData.date = data.date;
    projectData.userResponse = data.userResponse;
    
    console.log(projectData)
})

app.get('/getWeatherData', (req,res) => {
    res.send(projectData);
    console.log(projectData)

})