// SETUP + CONFIGURATION
//--------------------------------------------------------------------------------------------------
// import express and necessary Node packages
var express          = require('express'),
    mongoose         = require('mongoose'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override');

// execute the function to initialize the project as an express app
var app = express();

// location of ejs/HTML files for responses 
app.set('views', './views');
// allows us to not have to write .ejs extension for every ejs file
app.set('view engine', 'ejs');

// body-parser allows us to use form data
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * allows us to override methods in order to use PUT requests in our forms
 * because HTML forms don't support PUT requests, only GET and POST
 */
app.use(methodOverride('_method'));

// DATABASE CONNECTION + DEFINITION
//--------------------------------------------------------------------------------------------------
/*
 * fix all mongoose deprecation warnings.
 *
 * Mongoose provides Mongo DB object modelling for Node.js
 * It provides a schema based solution to model our data.
 * Mongoose makes it easier and cleaner for us to interact with our database
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/*
 * try and find a database with name 'Industry' and connect to it.
 * if no database exists with the name 'Industry', it will create one
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

// RESTFUL ROUTING
//--------------------------------------------------------------------------------------------------
// load the sample data
var DataFile = require('./data');
const data = DataFile.getData();

// function to add all contents of the data.js file to the database when called
function addAll(){
    data.forEach(function(seed){
        Employee.create(seed), function(error, createdEmployee){
            if (error){
                console.log('Something went wrong trying to save the data.');
            }
            else{
                //console.log('Sucessfully added Employee ' + createdEmployee.PERSON_NAME);
            }
        }
    });
    console.log('Added all sample Employees to the database.')
}

// function to delete all contents of the database when called
function deleteAll(){
    Employee.deleteMany({}, function(error){
        if(error){
            console.log('Something went wrong trying to purge the database.');
        }
        console.log('Removed all sample Employees from the database.');
    });
}

// path to add data to the database
app.put('/employees/seed', function(request, response){
    console.log('Route Hit: PUT /employees/seed');
    addAll()
    response.redirect('/employees');
});

// path to delete data from the database
app.delete('/employees/seed', function(request, response){
    console.log('Route Hit: DELETE /employees/seed');
    deleteAll();
    response.redirect('/employees');
});

// root path - landing page
app.get('/', function(request, response){
    console.log('Route Hit: GET /');
    response.render('index');
});

// READ: view all employees
app.get('/employees', function(request, response){
    console.log('Route Hit: GET /employees');
    Employee.find({}, function(error, allEmployees){
        console.log('All data from database:');
        console.log(allEmployees);
        if (error){
            console.log('Something went wrong trying to find the data.');
            response.render('404');
        }
        else{
            response.render('show', {employees: allEmployees})
        }
    });
});

// view the form to add a new employee to the employee database
app.get('/employees/new', function(request, response){
    console.log('Route Hit: GET /employees/new');
    response.render('new.ejs');
});

// CREATE: insert an employee to database
app.post('/employees', function(request, response){
    console.log('Route Hit: POST /employees');

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
    console.log('Route Hit: GET /employees/id/edit');
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
    console.log('Route Hit: PUT /employees/id');

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
    console.log('Route Hit: DELETE /employees/id');
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
app.get('*', function(request,response){
    response.render('404');
 });

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '127.0.0.1';

// allows the server to start listening for connections
var server = app.listen(PORT, IP, function(){
    console.log('Server has started');
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port)
});
