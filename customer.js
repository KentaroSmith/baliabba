let mysql = require("mysql");
let inquirer = require("inquirer");
require("dotenv").config();
//first list items
// prompt for selection and quantity then confirm
//if yes then update new quantity
//ask if they want to buy more
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.rootPassword,
    database: "baliabba_db"
});
var available_items = [];

function listItems() {
    connection.query("SELECT*FROM products;", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Amount in stock: " + res[i].stock_quantity);
            console.log("==========================================");
            available_items.push(res[i]);
        }
    });
    console.log("\n")
    checkout();
}
connection.connect(function (err) {
    if (err) throw err;
    listItems();
    //connection.end()
})


var checkout = function () {
    inquirer.prompt([
        {
            name: "choice",
            message: "would you like to buy something?",
            type: "confirm"
        }
    ]).then(function (response) {
        if (response.choice) {
            inquirer.prompt([
                {
                    name: "chosenID",
                    message: "Please choose the ID of the item you would like to buy",
                    type: "number",
                    type: "input"
                },
                {
                    name: "quantity",
                    type: "number",
                    message: "How many would you like to buy?",
                    type: "input"
                },
                {
                    type: "confirm",
                    message: "Confirm order?",
                    default: true,
                    name: "ready"
                }
            ]).then(function (response) {
                if (response.ready) {
                    var shoppingCart = available_items[parseInt(response.chosenID) - 1];
                    var stockLeft = parseInt(shoppingCart.stock_quantity);
                    var requestedAmount = parseInt(response.quantity);
                    console.log(response);
                    if (requestedAmount <= stockLeft) {
                        console.log("Item ID: " + shoppingCart.item_id);
                        console.log("Product Name: " + shoppingCart.product_name);
                        console.log("Department: " + shoppingCart.department_name);
                        console.log("Price: " + shoppingCart.price);
                        var newAmount = parseInt(stockLeft - requestedAmount)
                        console.log("New stock quantity: " + newAmount);
                        console.log("==========================================");
                        connection.query(
                            "UPDATE products SET stock_quantity = ? WHERE item_id = ?;"[newAmount, shoppingCart.item_id],
                            console.log(newAmount, shoppingCart.item_id),
                            function (error) {
                                if (error) throw (error);


                            }
                        );
                        listItems();
                    }
                    else {
                        console.log("There is insufficient stock. Please choose a different amount.");
                        listItems();
                    }
                }
                else {
                    listItems();

                }

            });
        }
        else {
            connection.end();
        }
    }

    )
};




