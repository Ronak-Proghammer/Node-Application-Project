import mysql from "mysql";

// Creating connection
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cprg212user",
  database: "CPRG212",
});

export default con;
