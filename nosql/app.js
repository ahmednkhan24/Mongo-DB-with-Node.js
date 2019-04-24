// import express and necessary Node packages
var express = require("express");

// execute the function to initialize the project as an express app
var app = express();

// root path
app.get("/", function(request, response){
    response.send("This is the landing page.")
    //response.render("This is the landing page");
});


const PORT = process.env.PORT || 5006;
const IP = process.env.IP || "127.0.0.1";

// allows the server to start listening for connections
var server = app.listen(PORT, IP, function(){
    console.log("Project server has started");
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
