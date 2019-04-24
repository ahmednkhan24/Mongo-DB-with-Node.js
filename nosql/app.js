// import express and necessary Node packages
var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser');

// execute the function to initialize the project as an express app
var app = express();

// location of view files for responses 
app.set('views', './views');
// allows us to not have to write .ejs extension for every ejs file
app.set('view engine', 'ejs');

// body-parser allows us to use form data
app.use(bodyParser.urlencoded({ extended: true }));


/*
 * try and find a database with name 'mydatabase' and connect to it.
 * if no database exists with the name 'mydatabase', it will create one
 */
var databaseName = 'Industry';
mongoose.connect('mongodb://localhost/' + databaseName, { useNewUrlParser: true });

var employeeSchema = new mongoose.Schema({
    PERSON_NAME: String,
    STREET: String,
    CITY: String
});

var employmentSchema = new mongoose.Schema({
    PERSON_NAME: String,
    COMPANY_NAME: String,
    SALARY: Number
});

var companySchema = new mongoose.Schema({
    COMPANY_NAME: String,
    CITY: String
});

var Employee = mongoose.model('Employee', employeeSchema);
var Employment = mongoose.model('Employment', employmentSchema);
var Company = mongoose.model('Company', companySchema);


// root path
app.get('/', function(request, response){
    response.render('index');
});

// view all employees
app.get('/employee', function(request, response){
    response.render('index');
});

// view the form to add a new employee to the employee database
app.get('/employee/new', function(request, response){
    response.render('new.ejs');
});

// insert an employee to database
app.post('/employee', function(request, response){
    var name = request.body.name;
    var street = request.body.street;
    var city = request.body.city;

    var emp = new Employee({
        PERSON_NAME: name,
        STREET: street,
        CITY: city
    });

    emp.save(function(error, savedEmployee){
        if (error) {
            console.log('Something went wrong trying to save the data.');
        }
        else {
            console.log('Data successfully saved.');
        }
    });

    response.send('you hit the post request')
});




const PORT = process.env.PORT || 5007;
const IP = process.env.IP || '127.0.0.1';

// allows the server to start listening for connections
var server = app.listen(PORT, IP, function(){
    console.log('Project server has started');
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
