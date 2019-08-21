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
var available_items = [];


connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT*FROM products;", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Amount in stock: " + res[i].stock_quantity);
            console.log("==========================================");
            available_items.push(res[i].item_id);
        }
    });
    connection.end()
})
var checkout = function () {
    inquirer
        .prompt([
            {
                name: "chosenID",
                message: "Please choose the ID of the item you would like to buy",
                type: "choice",
                choices: [available_items]
            },
            {
                type: "number",
                message: "How many would you like to buy?",
                //Left off here setting up quantity prompt
            },
            {
                type: "confirm",
                message: "Confirm order?",
                default: true,
                name: "ready"
            }
        ])
        .then(function (response) {
            if (response.ready) {
                console.log(response.chosenID);
            }
        })
}
checkout();
