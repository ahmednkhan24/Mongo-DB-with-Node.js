# Mongo DB Integration with Node.js
When it comes to database systems, there are two main types to choose from:
relational or non-relational databases. Another term heavily used is SQL and No-SQL,
since most relational databases are interactd with through the use of SQL.

Relational databases are tabular, flat, and very inflexible. 
Non-relational databases, on the other hand, are not tabular, can be nested, and are very flexible.

Mongo DB is one of the most popular non-relational database systems used in industry
for the advantages non-relational databases bring, but also because the data is stored in a structure
called BSON, which stands for Binary JavaScript Object Notation. The data is already stored in a
JavaScript Object Notation, like JSON, and is easily understandable by most developers without
too much difficulty. 

This project will explain how to use Mongo DB, but also how to integrate it within a web applicaiton
using Node.js in order to demonstrante the power of Mongo DB, and also the almost seamless integration
with JavaScript frameworks like Node.js.

## REST
This web application adheres to RESTful routing.
REST stands for Representational State Transfer, which is an architectural style where
data and functionality are considered resources and are accessed using Uniform Resource 
Identifiers (URIs). These resources are acted upon through a set of defined operations. 
They are designed to be a stateless communication protocol using HTTP.
There are multiple RESTful commands, but the most common four are the CRUD method:
POST:   Create 
GET:    Read
PUT:    Update
DELETE: Delete 

RESTFUL ROUTES Implementation 
    
| name     | url                  | verb    | desc                                                    |
| -------- |:--------------------:|:-------:|--------------------------------------------------------:|
| INDEX    | /employees           | GET     | display a list of all employees                         |
| NEW      | /employees/new       | GET     | displays the form to add a new employee                 |
| CREATE   | /employees           | POST    | adds a new employee to the database                     |
| EDIT     | /employees/:id/edit  | GET     | shows the edit form for one campground                  |
| UPDATE   | /employees/:id       | PUT     | updates a particular employee, then redirects somewhere |
| DESTROY  | /employees/:id       | DELETE  | deletes a particular employee, then redirects somehwere |

## Prerequisites
* NPM installed
* Mongo DB installed (Instructions uses Homebrew for Mac OS installation)
* Moderate knowledge of HTML, JavaScript, Node.js

## Install and Run Mongo DB
* Update homebrew
    * `brew update`
* Install Mongo DB to machine
    * `brew install mongodb`
* Create directory where the Mongo data files will be stored
    * `sudo mkdir -p /data/db`
* update permissions for the directory
    * sudo chown -R `id -un` /data/db
* Start the Mongo daemon server
    * `mongod`
* Start the Mongo shell client in another terminal window
    * `mongo`

## Interaction with Mongo DB data
Interacting with the Mongo DB database via the terminal is very similar to
interacting with SQL via the terminal.

## Create a Simple Node.js Project
* Create project folder
    * `mkdir MyNodeProject`
* Initialize the npm package.json file
    * `npm init`
* Install npm packages needed for the project
    * `npm install express ejs mongoose --save`
