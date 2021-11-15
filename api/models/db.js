const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;


// CREATE TABLE companies (
//     id TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT,
//     name VARCHAR(80) NOT NULL,
//     email varchar(80) null,
//     phone int null,
//     website varchar(80) null,
//     PRIMARY KEY(id),
//     UNIQUE KEY `name_UNIQUE` (`name`),
//     KEY `key_1` (`id`,`name`)
// )
// ENGINE=InnoDB;


// CREATE TABLE employees (
//     id TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
//     firstname VARCHAR(100) NOT NULL,
//     lastname VARCHAR(100) NOT NULL,
//     company VARCHAR(80),
//     email VARCHAR(100) NULL,
//     phone int null,
//     PRIMARY KEY(id),
//     KEY `employees_fk1` (`company`),
//     CONSTRAINT `employees_fk1` FOREIGN KEY (`company`) REFERENCES `companies` (`name`)
//     ON DELETE NO ACTION
//     -- INDEX networks_index2471(name),
// --     INDEX networks_index2472(director_id, director_name)
// )
// ENGINE=InnoDB;