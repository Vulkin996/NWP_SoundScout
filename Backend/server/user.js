var express = require('express');
// var jwt = require('jsonwebtoken');
var router = express.Router();

const mysqlConnection = require('./connection.js');

router.post('/login', (req, res) => {

});

router.post('/register', (req, res) => {
    var user = req.body;

    var sql = "INSERT INTO user (username, email, password) VALUES ('" + user.username + "', '" + user.email + "', '" + user.password + "' )";
    mysqlConnection.query(sql, function (err, result) {
        if (err) 
        {
            switch(err.code) {
                case 'ER_DUP_ENTRY':
                    res.status(400).json({msg: 'User already exists, please login.'});
                  break;
                default:
                    res.status(500).json({msg: err.message});
              } 
        } 
        else 
        {
            console.log("User successfully registered");
        }
    });
});

module.exports = router;