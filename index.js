const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require ("express");
const { printTable } = require('console-table-printer');

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username
    user: 'root',
    // Add MySQL password here
    password: '',
    database: 'tracker_db',
  },
  console.log(`Connected to the tracker_db database.`)
);


run ();

// Inquirer allows question selection

function run() {
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Roles",
            "Update Employee Role",
            "Remove Employee",
            "Exit"
          ]
        })
    
        // Switch cases depending on user selection
    
        .then(function(answer) {
          switch (answer.action) {
          case "View All Employees":
            viewEmployee();
            break;
          
          case "View All Departments":
            viewDepartment();
            break;
        
          case "View All Roles":
            viewRole();
            break;
    
          case "Add Employee":
            addEmployee();
            break;
    
          case "Add Department":
            addDepartment();
            break;
    
          case "Add Roles":
            addRole();
            break;
    
          case "Update Employee Role":
            updateRole();
            break;
    
          case "Remove Employee":
            removeEmployee();
            break;
    
          case "Exit":
            exit();
            break;
          }
        });
    }

    // Function to view choices on user selection

function viewEmployee() {
      connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
      });
    }
    
    function viewDepartment() {
      connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
      });
    }
    
    function viewRole() {
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
      });
    }
    
    function viewManager() {
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        run();
      });
    }