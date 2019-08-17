var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.rootPassword,
    database: "baliabba_db"
});

connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT*FROM products;", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i])
        }
    });
    connection.end()
})
