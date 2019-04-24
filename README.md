# SQL-vs-NoSQL
Project for CS 480 at UIC comparing relational and non-relational databases

## Prerequisites
* NPM installed
* Mongo DB installed (Instructions uses Homebrew for Mac OS installation)
* Working knowledge of HTML, JavaScript, Node.js, Express, Basic SQL, REST

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

# Create a Simple Node.js Project
* Create project folder
    * `mkdir MyNodeProject`
* Initialize the npm package.json file
    * `npm init`
* Install npm packages needed for the project
    * `npm install express ejs mongoose --save`
