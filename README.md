# SQL-vs-NoSQL
Project for CS 480 at UIC comparing relational and non-relational databases

## Prerequisites
* NPM installed
* Brew installed (Mac OS)

## Install Mongo DB
* brew update
* brew install mongodb
* sudo mkdir -p /data/db
    * This is where the Mongo data files will be stored
* sudo chown -R `id -un` /data/db
    * update permissions for the directory

The 'mongod' command will start the Mongo daemon server
The 'mongo' command in another terminal window will run the mongo 
shell client in order to access the data

# Creating Simple Node.js Project
* mkdir nosql
* npm init
* npm install express ejs --save
