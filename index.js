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

      // Adds user data into corresponding functions

      function addEmployee() {
            inquirer
            .prompt([
            {
            name: "first_name",
            type: "input",
            message: "Enter the employee's first name.",
            validate: function(answer) {
                  if (answer !== "") {
                  return true;
                  }
                  return "Employee's first name must contain at least one character.";
                  }
            },
            {
            name: "last_name",
            type: "input",
            message: "Enter the employee's last name.",
            validate: function(answer) {
                  if (answer !== "") {
                  return true;
                  }
                  return "Employee's first name must contain at least one character.";
                  }
      
            },
            {
            name: "role_id",
            type: "input",
            message: "Enter the employee's role id.",
            validate: function(answer) {
                  if (isNaN(answer) === false) {
                  return true;
                  }
                  return false;
                  }
            },
            {
            name: "manager_id",
            type: "input",
            message: "Enter the employee's manager id.",
            validate: function(answer) {
                  if (isNaN(answer) === false) {
                        return true;
                  }
                  return false;
            }
            }
            ])
            .then(function(answer) {
            connection.query("INSERT INTO employee SET ?",
                  {first_name: answer.first_name,
                  last_name: answer.last_name,
                  role_id: answer.role_id || 0,
                  manager_id: answer.manager_id || 0},
                  function(err) {
                  if (err) throw err;
                  console.log("You have successfully added this employee!");
                  run();
                  }
            );
            });
      };
      
      function addDepartment() {
            inquirer
            .prompt({
            name: "department",
            type: "input",
            message: "Enter the department you want to add."
            })
            .then(function(answer) {
            connection.query("INSERT INTO department SET ?",
                  { name: answer.department },
                  function(err) {
                  if (err) throw err;
                  console.log("You have successfully added this department!");
                  run();
                  }
            );
            });
      };
      
      function addRole() {
            inquirer
            .prompt([
            {
            name: "title",
            type: "input",
            message: "Please enter the role's title.",
            validate: function(answer) {
                  if (answer !== "") {
                  return true;
                  }
                  return "The role must contain at least one character.";
                  }
            },
            {
            name: "salary",
            type: "input",
            message: "Please enter the role's salary.",
      
            },
            {
            name: "department_id",
            type: "input",
            message: "Please enter the department id.",
            validate: function(answer) {
                  if (isNaN(answer) === false) {
                  return true;
                  }
                  return false;
            }
      
            }
            ])
            .then(function(answer) {
            connection.query("INSERT INTO role SET ?",
                  {title: answer.title,
                  salary: answer.salary || 0,
                  department_id: answer.department_id || 0},
                  function(err) {
                  if (err) throw err;
                  console.log("You have successfully added this role!");
                  run();
                  }
            );
            });
      };
