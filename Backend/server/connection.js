const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "soundscout",
    multipleStatements: true

});

mysqlConnection.connect((err) => { 
    if(err)
    {
        console.log('Failed to connect to the database!')
        console.log('Reason: ' + err.message)
    } 
    else
    {
        console.log('Successfully connected to the database!') 
    }
});

module.exports = mysqlConnection;