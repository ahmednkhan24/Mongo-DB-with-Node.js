// import express and necessary Node packages
var express          = require('express'),
    mongoose         = require('mongoose'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer');

// execute the function to initialize the project as an express app
var app = express();

// location of view files for responses 
app.set('views', './views');
// allows us to not have to write .ejs extension for every ejs file
app.set('view engine', 'ejs');

// body-parser allows us to use form data
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * When rendering HTML, a user could potentially enter a harmful script,
 * so sanitizer will help us not run that code
 * Not really necessary for this project, but a good reminder nonetheless.
 * 
 * Only requirement is that it is used after bodyParser
 */
app.use(expressSanitizer());

/*
 * allows us to override methods in order to use PUT requests in our forms
 * because HTML forms don't support PUT requests, only GET and POST
 */
app.use(methodOverride("_method"));

// fix all mongoose deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/*
 * try and find a database with name 'mydatabase' and connect to it.
 * if no database exists with the name 'mydatabase', it will create one
 */
var databaseName = 'Industry';
mongoose.connect('mongodb://localhost/' + databaseName, { useNewUrlParser: true });

/*
 * This doesn't do anything to our database.
 * It tells Javascript that we want to be able to add employees to our database,
 * and an employee should have a pattern that looks like this.
 * 
 * The benefit of NoSQL is that we aren't forbidden from adding new stuff
 * or leaving certain things off.
 * 
 * It's just a way of providing structure because we do need some sort of
 * predictable structure in order to write JS code that can handle employees.
 * 
 * Let's say that we want a template to print out an employee's name and city.
 * We would need to make sure that every employee has the name and age attribute,
 * and be able to anticipate any employees in our db that do not have a name or city
 */
var employeeSchema = new mongoose.Schema({
    PERSON_NAME: String,
    STREET: String,
    CITY: String
});

/*
 * Takes the employee schema pattern that says every employee should have a name, street, 
 * and city and compiles it into a model and saves it to a variable named 'Employee'
 * and now we can use the Employee variable to insert, find, and delete
 * Employees from the database. 
 * 
 * It takes the first parameter passed to it and creates a collection with
 * that name.
 * In Mongo DB, a collection is similar to an SQL table
 */
var Employee = mongoose.model('Employee', employeeSchema);


// root path
app.get('/', function(request, response){
    response.render('index');
});

// READ: view all employees
app.get('/employees', function(request, response){
    Employee.find({}, function(error, allEmployees){
        if (error){
            console.log("Something went wrong trying to find the data.");
            response.render('404');
        }
        else{
            response.render('show', {employees: allEmployees})
        }
    });
});

// view the form to add a new employee to the employee database
app.get('/employees/new', function(request, response){
    response.render('new.ejs');
});

// CREATE: insert an employee to database
app.post('/employees', function(request, response){
    // clean the body of any potential malicious script
    request.body.employee.body = request.sanitize();

    // grab the data from the HTML form
    var data = request.body.employee;

    // create an Employee object
    var emp = new Employee(data);

    // insert the Employee object to the database
    emp.save(function(error, savedEmployee){
        if (error){
            console.log('Something went wrong trying to save the data.');
            response.render('404');
        }
        else{
            response.redirect('/employees');
        }
    });
});

// view the form to edit an employee from the employee database
app.get('/employees/:id/edit', function(request, response){
    Employee.findById(request.params.id, function(error, foundEmployee){
        if (error){
            console.log('Something went wrong.');
            response.render('404');
        }
        else{
            response.render('edit', {employee: foundEmployee});
        }
    });
});

// UPDATE: update an employee from the employee database
app.put('/employees/:id', function(request, response){
    // clean the body of any potential malicious script
    request.body.employee.body = request.sanitize();

    Employee.findByIdAndUpdate(request.params.id, request.body.employee, function(error, updatedEmployee){
        if (error) {
            console.log('Something went wrong trying to save the data.');
            response.render('404');
        }
        else {
            response.redirect('/employees');
        }
    });
});

// DESTROY: delete an employee from the employee database
app.delete('/employees/:id', function(request, response){
    Employee.findByIdAndRemove(request.params.id, function(error){
        if (error) {
            console.log('Something went wrong trying to save the data.');
            response.render('404');
        }
        else {
            response.redirect('/employees');
        }
    });
});

// any other URL that isn't defined here should redirect to the 404 page
app.get("*", function(request,response){
    response.render('404');
 });

const PORT = process.env.PORT || 5001;
const IP = process.env.IP || '127.0.0.1';

// allows the server to start listening for connections
var server = app.listen(PORT, IP, function(){
    console.log('Project server has started');
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
