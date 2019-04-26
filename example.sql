
-- a database with the same name as another can not be created
DROP DATABASE IF EXISTS Industry;

-- self explanatory 
CREATE DATABASE Industry;

-- define the SQL schema that defines an Employee
-- a primary key must be specified in order to make any sort of
-- connection with data from another table.
-- Another key thing to point out here, is that these are the only
-- attributes that can be inserted into the database and no other's
-- can be added without completley changing the schema, and 
-- adding the attribute for every other entry in the database.
CREATE TABLE Employee (
  PERSON_NAME char(20),
  STREET char(20) NOT NULL,
  CITY char(20) NOT NULL, 
  PRIMARY KEY (PERSON_NAME)
);

-- In order to make SQL queries to the database it must be in use
USE Industry;

-- This is how an insertion into the database must be made
INSERT INTO Employee VALUES('Jacob', 'West Taylor', 'Miami');

-- This is an SQL query that will obtain all data from the Employee table
SELECT * FROM Employee ORDER BY PERSON_NAME;
