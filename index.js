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