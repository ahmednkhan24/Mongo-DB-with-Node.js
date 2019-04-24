// import express and necessary Node packages
var express = require('express');

// execute the function to initialize the project as an express app
var app = express();

// location of view files for responses 
app.set('views', './views');
// allows us to not have to write .ejs extension for every ejs file
app.set('view engine', 'ejs');





// root path
app.get('/', function(request, response){
    response.render('index');
});

app.post('/insert', function(request, response){

    response.send('you hit the post request')

});







const PORT = process.env.PORT || 5006;
const IP = process.env.IP || '127.0.0.1';

// allows the server to start listening for connections
var server = app.listen(PORT, IP, function(){
    console.log('Project server has started');
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
